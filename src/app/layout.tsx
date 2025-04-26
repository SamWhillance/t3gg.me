import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T3GG.me - Become Theo from t3.gg",
  description:
    "Upload your selfie and transform into Theo from t3.gg. Perfect for X profile pictures!",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://t3gg.me"),
  openGraph: {
    title: "T3GG.me - Become Theo from t3.gg",
    description:
      "Transform into Theo from t3.gg. Perfect for X profile pictures!",
    images: [
      {
        url: "/icon-512.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T3GG.me - Become Theo from t3.gg",
    description:
      "Transform into Theo from t3.gg. Perfect for X profile pictures!",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0f0f12" />
        <link rel="mask-icon" href="/icon-192.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
      </head>
      <body className={`${inter.className} bg-[#0f0f12] text-white`}>
        <div className="fixed inset-0 bg-[url('/theo_bg.jpeg')] bg-cover bg-center bg-no-repeat blur-md z-[-2]"></div>
        <div className="fixed inset-0 bg-[#0f0f12] bg-opacity-60 z-[-1]"></div>
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] z-[-1]"></div>
        <header className="py-6 px-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold text-white">
              <span className="text-purple-500">T3GG</span>.me
            </div>
            <a
              href="https://github.com/samwhillance/t3gg.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>
        <main className="relative">{children}</main>
        <footer className="py-8 px-4 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              Built for a laugh. Not affiliated with Theo or t3.gg.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © {new Date().getFullYear()} t3gg.me
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
