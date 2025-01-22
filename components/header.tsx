"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    { href: "/", label: "Leaderboard" },
    { href: "/research", label: "Research" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin" },
];

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActiveRoute = (route: string): boolean => {
        if (route === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(route);
    };

    return (
        <header className="border-b border-border/40 bg-background/10 backdrop-blur fixed top-0 left-0 right-0 z-50 shadow-lg">
            <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-6 w-6">
                            <div className="h-full w-full text-emerald-500">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                        <span className="font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                            VerifyInfluencers
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {menuItems.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors hover:text-foreground ${
                                    isActiveRoute(link.href)
                                        ? "text-foreground font-bold"
                                        : "text-foreground/50"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-2">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground/60 hover:text-foreground"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    <Button
                        variant="ghost"
                        className="hidden md:flex text-foreground/60 hover:text-foreground hover:bg-background/20"
                        onClick={() => {
                            // Handle sign out logic here
                            console.log("Sign out clicked");
                        }}
                    >
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-border/40 bg-background/10 backdrop-blur"
                    >
                        <nav className="flex flex-col px-4 py-4 gap-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm transition-colors hover:text-foreground ${
                                        isActiveRoute(item.href)
                                            ? "text-foreground font-bold"
                                            : "text-foreground/50"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button
                                variant="ghost"
                                className="justify-start text-foreground/60 hover:text-foreground hover:bg-background/20"
                                onClick={() => {
                                    // Handle sign out logic here
                                    console.log("Sign out clicked");
                                }}
                            >
                                <LogOutIcon className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
