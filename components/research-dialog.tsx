"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AtSign, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

interface ResearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type ResearchStatus = {
    step: "idle" | "fetching" | "analyzing" | "complete";
    progress: number;
    message: string;
};

/**
 * Dialog component for initiating research on a new influencer
 */
const ResearchDialog = ({ open, onOpenChange }: ResearchDialogProps) => {
    const [twitterHandle, setTwitterHandle] = React.useState("");
    const [status, setStatus] = React.useState<ResearchStatus>({
        step: "idle",
        progress: 0,
        message: "",
    });
    const router = useRouter();

    const handleResearch = React.useCallback(async () => {
        if (!twitterHandle) return;

        try {
            // Start research
            setStatus({
                step: "fetching",
                progress: 20,
                message: "Fetching Twitter profile...",
            });

            // Call our API endpoint
            const response = await fetch("/api/research", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: twitterHandle }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Twitter data");
            }

            setStatus({
                step: "analyzing",
                progress: 60,
                message: "Analyzing tweets...",
            });

            const data = await response.json();

            // Simulate analysis time
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setStatus({
                step: "complete",
                progress: 100,
                message: "Analysis complete!",
            });

            // Close dialog and reset state
            await new Promise((resolve) => setTimeout(resolve, 500));
            onOpenChange(false);
            setTwitterHandle("");

            // Navigate to detail page
            router.push(`/detail/${data.user.username}`);
        } catch (error) {
            console.error("Research failed:", error);
            setStatus({
                step: "idle",
                progress: 0,
                message: "Research failed. Please try again.",
            });
        }
    }, [router, twitterHandle, onOpenChange]);

    // Reset state when dialog closes
    React.useEffect(() => {
        if (!open) {
            setTwitterHandle("");
            setStatus({
                step: "idle",
                progress: 0,
                message: "",
            });
        }
    }, [open]);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && twitterHandle && status.step === "idle") {
                handleResearch();
            }
        },
        [twitterHandle, status.step, handleResearch]
    );

    const isLoading = status.step !== "idle";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-gray-900/95 border border-gray-700/30 shadow-lg backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle>Research New Influencer</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Enter a Twitter/X handle to analyze their health-related content and credibility.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="username"
                                value={twitterHandle}
                                onChange={(e) => setTwitterHandle(e.target.value)}
                                disabled={isLoading}
                                onKeyDown={handleKeyDown}
                                className="pl-10 bg-gray-800/50 border-gray-700/30 text-gray-300 placeholder:text-gray-500 focus-visible:ring-emerald-500/50"
                            />
                        </div>
                    </div>
                    {isLoading && (
                        <div className="space-y-2">
                            <Progress value={status.progress} className="h-2 bg-gray-800/50" />
                            <p className="text-sm text-gray-400 text-center">{status.message}</p>
                        </div>
                    )}
                    <Button
                        onClick={handleResearch}
                        disabled={!twitterHandle || isLoading}
                        className="w-full bg-emerald-600 border-emerald-500 hover:bg-emerald-600/80 text-gray-50 font-semibold"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing Profile...
                            </>
                        ) : (
                            "Start Research"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ResearchDialog;
