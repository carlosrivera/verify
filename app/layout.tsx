import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VerifyInfluencers",
  description: "AI-powered health influencer verification platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-200 dark`}
      >
        <div className="min-h-screen relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="fixed inset-0 overflow-hidden">
              <div
                  className="absolute -inset-[10px] opacity-100"
                  style={{
                      background: "radial-gradient(circle at top center, rgba(37, 50, 87, 0.5) 0%, rgba(37, 99, 235, 0) 80%)",
                  }}
              />
          </div>

          <Header />

          <main className="container max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10 mt-14">
              {children}
          </main>
        </div>
      </body>
    </html>
  );
}
