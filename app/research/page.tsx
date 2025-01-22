import { ResearchConfig } from "@/components/research-config";
import { PageTitle } from "@/components/page-title";

/**
 * Research page component for configuring and initiating research tasks
 */
export default function ResearchPage() {
    return (
        <div className="mx-auto max-w-4xl">
            <PageTitle
                title="Research Tasks"
                backLink={{
                    href: "/",
                    label: "Back to Leaderboard"
                }}
            />

            <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 shadow-lg relative overflow-hidden mb-20">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0) 70%)",
                    }}
                />
                <div className="relative z-10">
                    <ResearchConfig />
                </div>
            </div>
        </div>
    );
}
