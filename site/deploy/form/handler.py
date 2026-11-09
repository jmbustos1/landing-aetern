"""
Handler del formulario de contacto de AETERN.
POST JSON {email, message} -> guarda en S3 + avisa por SES.
Rate limiting agresivo por IP (DynamoDB, ventana fija). boto3 ya viene en Lambda.
"""
import base64
import datetime
import json
import os
import time
import uuid

import boto3

s3 = boto3.client("s3")
ses = boto3.client("ses")
ddb = boto3.client("dynamodb")

BUCKET = os.environ["SUBMISSIONS_BUCKET"]
NOTIFY = os.environ.get("NOTIFY_EMAIL", "").strip()
FROM = os.environ.get("FROM_EMAIL", "").strip() or NOTIFY
RATE_TABLE = os.environ.get("RATE_TABLE", "").strip()
RATE_LIMIT = int(os.environ.get("RATE_LIMIT", "5"))          # envíos por IP…
RATE_WINDOW = int(os.environ.get("RATE_WINDOW", "3600"))     # …por esta ventana (seg)

# OJO: NO ponemos headers CORS aquí. La config CORS del Lambda Function URL ya
# los agrega; si los duplicamos, el navegador rechaza la respuesta (bug del form).
def _resp(code, body):
    return {
        "statusCode": code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def _rate_ok(ip):
    """Ventana fija por IP en DynamoDB. Fail-open: si DDB falla, no bloquea."""
    if not RATE_TABLE or not ip:
        return True
    now = int(time.time())
    bucket = now // RATE_WINDOW
    try:
        r = ddb.update_item(
            TableName=RATE_TABLE,
            Key={"pk": {"S": f"{ip}#{bucket}"}},
            UpdateExpression="ADD #c :one SET #e = if_not_exists(#e, :exp)",
            ExpressionAttributeNames={"#c": "count", "#e": "expires_at"},
            ExpressionAttributeValues={
                ":one": {"N": "1"},
                ":exp": {"N": str((bucket + 1) * RATE_WINDOW + 120)},
            },
            ReturnValues="UPDATED_NEW",
        )
        return int(r["Attributes"]["count"]["N"]) <= RATE_LIMIT
    except Exception as e:
        print("rate check error:", e)
        return True


def handler(event, context):
    ctx = event.get("requestContext", {}).get("http", {})
    method = ctx.get("method", "POST")
    ip = ctx.get("sourceIp", "")
    if method == "OPTIONS":
        return _resp(200, {"ok": True})

    if not _rate_ok(ip):
        return _resp(429, {"error": "demasiadas solicitudes, intenta mas tarde"})

    try:
        raw = event.get("body") or "{}"
        if event.get("isBase64Encoded"):
            raw = base64.b64decode(raw).decode("utf-8")
        data = json.loads(raw)
    except Exception:
        return _resp(400, {"error": "json invalido"})

    # Honeypot: si viene relleno, es bot. Aceptamos en silencio y descartamos.
    if data.get("botcheck"):
        return _resp(200, {"ok": True})

    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()
    if not email or not message:
        return _resp(400, {"error": "faltan campos"})
    if len(email) > 320 or len(message) > 5000:
        return _resp(400, {"error": "campos demasiado largos"})

    now = datetime.datetime.utcnow().isoformat() + "Z"
    record = {"ts": now, "ip": ip, "email": email, "message": message}
    key = f"submissions/{now[:10]}/{now}-{uuid.uuid4().hex[:8]}.json"
    s3.put_object(
        Bucket=BUCKET,
        Key=key,
        Body=json.dumps(record, ensure_ascii=False).encode("utf-8"),
        ContentType="application/json",
    )

    if NOTIFY:
        try:
            ses.send_email(
                Source=FROM,
                Destination={"ToAddresses": [NOTIFY]},
                Message={
                    "Subject": {"Data": f"Nuevo mensaje desde aetern.dev - {email}"},
                    "Body": {"Text": {"Data": f"De: {email}\nIP: {ip}\nFecha: {now}\n\n{message}"}},
                },
                ReplyToAddresses=[email] if "@" in email else [],
            )
        except Exception as e:
            print("SES error:", e)

    return _resp(200, {"ok": True})
