"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Key, Lock } from "lucide-react";
import React from "react";

/**
 * API Keys management page component
 * Allows users to configure various API keys for the application
 */
const ApiKeysPage = () => {
    const [perplexityKey, setPerplexityKey] = React.useState("");
    const [twitterKey, setTwitterKey] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically save the API keys to your backend
        toast({
            title: "Success",
            description: "Your API keys have been successfully updated.",
            variant: "default",
        });
    };

    return (
        <div className="mx-auto max-w-4xl">
            <PageTitle
                title="API Keys Management"
                backLink={{
                    href: "/admin",
                    label: "Back to Settings",
                }}
            />

            <div className="rounded-lg border border-gray-700/30 bg-gray-900/95 shadow-lg relative overflow-hidden mb-20 backdrop-blur-sm">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0) 70%)",
                    }}
                />
                <div className="relative z-10 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="font-semibold" htmlFor="perplexity">
                                Perplexity API Key
                            </Label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="perplexity"
                                    type="password"
                                    value={perplexityKey}
                                    onChange={(e) => setPerplexityKey(e.target.value)}
                                    placeholder="Enter your Perplexity API key"
                                    className="pl-10 bg-gray-800/50 border-gray-700/30 text-gray-300 placeholder:text-gray-500 focus-visible:ring-emerald-500/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold" htmlFor="twitter">
                                Twitter Bearer Token
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="twitter"
                                    type="password"
                                    value={twitterKey}
                                    onChange={(e) => setTwitterKey(e.target.value)}
                                    placeholder="Enter your Twitter Bearer token"
                                    className="pl-10 bg-gray-800/50 border-gray-700/30 text-gray-300 placeholder:text-gray-500 focus-visible:ring-emerald-500/50"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="w-full md:w-fit bg-emerald-600 border-emerald-500 hover:bg-emerald-600/80 text-gray-50 font-semibold"
                            >
                                Save API Keys
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApiKeysPage;
