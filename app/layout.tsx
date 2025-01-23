import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Verify Influencers",
    description: "AI-powered health influencer verification platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-200 dark`}>
                <div className="min-h-screen relative overflow-hidden">
                    {/* Background gradient effect */}
                    <div className="fixed inset-0 overflow-hidden">
                        <div
                            className="absolute -inset-[10px] opacity-100"
                            style={{
                                background:
                                    "radial-gradient(circle at top center, rgba(37, 50, 87, 0.5) 0%, rgba(37, 99, 235, 0) 80%)",
                            }}
                        />
                    </div>

                    <NuqsAdapter>
                        <Header />

                        <Suspense
                            fallback={
                                <div className="flex justify-center items-center h-screen">
                                    <Loader2 className="animate-spin h-4 w-4 text-gray-500/60" />
                                </div>
                            }
                        >
                            <main className="container max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10 mt-14">
                                {children}
                            </main>
                        </Suspense>
                    </NuqsAdapter>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
