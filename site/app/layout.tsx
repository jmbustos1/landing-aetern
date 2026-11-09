import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-noto-serif",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aetern.dev"),
  title: "AETERN — Software Manufacturing",
  description:
    "Construimos sistemas de software que perduran. Con calma, precisión y visión a largo plazo.",
  openGraph: {
    type: "website",
    url: "https://aetern.dev",
    siteName: "AETERN",
    title: "AETERN — Software Manufacturing",
    description:
      "Construimos software que perdura. Con calma, precisión y visión a largo plazo.",
    locale: "es_CL",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AETERN — Software Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AETERN — Software Manufacturing",
    description: "Construimos software que perdura.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${notoSerif.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        {/* Sin JavaScript no corre el observador: el contenido debe verse igual. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
