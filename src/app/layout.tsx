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
    "Upload your selfie and transform into Theo from t3.gg with our AI face swap technology. Perfect for X profile pictures!",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0f0f12] text-white`}>
        <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f12] via-[#1a1a24] to-[#0f0f12] z-[-2]"></div>
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] z-[-1]"></div>
        <header className="py-6 px-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold text-white">
              <span className="text-purple-500">T3GG</span>.me
            </div>
            <a
              href="https://github.com/your-username/t3gg.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>
        <main className="relative">{children}</main>
        <footer className="py-8 px-4 border-t border-gray-800 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              Made with ❤️ for the Theo community. Not affiliated with Theo or
              t3.gg.
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
