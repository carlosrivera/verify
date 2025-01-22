"use client";

import { Users2, CheckCircle, LineChart } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";
import { influencerData } from "@/data/sample";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = ["Nutrition", "Fitness", "Medicine", "Mental Health", "Neuroscience"] as const;

/**
 * Leaderboard page showing influencer trust rankings
 */
const LeaderboardPage = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    const filteredInfluencers = React.useMemo(() => {
        if (!selectedCategory) return influencerData;
        return influencerData.filter((influencer) => influencer.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="mx-auto max-w-5xl mb-20">
            <div className="flex flex-col max-w-5xl mx-auto">
                <PageTitle
                    title="Influencer Trust Leaderboard"
                    description="Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis."
                />

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                    <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                            <Users2 className="h-6 w-6 md:h-8 md:w-8 text-emerald-500" />
                            <div>
                                <div className="text-xl md:text-2xl font-bold">1,234</div>
                                <div className="text-xs md:text-sm text-gray-400">Active Influencers</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                            <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-emerald-500" />
                            <div>
                                <div className="text-xl md:text-2xl font-bold">25,431</div>
                                <div className="text-xs md:text-sm text-gray-400">Claims Verified</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 rounded-lg border border-gray-700/30 bg-gray-900/70 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                            <LineChart className="h-6 w-6 md:h-8 md:w-8 text-emerald-500" />
                            <div>
                                <div className="text-xl md:text-2xl font-bold">85.7%</div>
                                <div className="text-xs md:text-sm text-gray-400">Average Trust Score</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 text-sm font-semibold">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-colors duration-200",
                                    selectedCategory === category
                                        ? "bg-emerald-500 text-white"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "px-4 py-2 rounded-full transition-colors duration-200",
                                !selectedCategory ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            )}
                        >
                            All
                        </button>
                    </div>
                </div>
            </div>

            {/* Leaderboard Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filteredInfluencers.map((influencer, index) => (
                    <motion.div
                        key={influencer.handler}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Link href={`/detail/${influencer.handler}`}>
                            <div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-gray-700/30 bg-gray-900/70 p-4 hover:bg-gray-800/50 transition-all duration-300">
                                {/* Rank and Profile Section */}
                                <div className="flex flex-row-reverse sm:flex-row items-center gap-4 w-full">
                                    {/* Rank */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-800/15 text-lg font-bold">
                                        #{index + 1}
                                    </div>

                                    {/* Profile Image & Name */}
                                    <div className="flex flex-1 items-center gap-4">
                                        <div className="relative h-12 w-12 shrink-0 group-hover:scale-125 transition-all duration-300">
                                            <Image
                                                src={influencer.image}
                                                alt={influencer.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[150px]">
                                            <h3 className="font-semibold group-hover:text-white transition-all duration-300">
                                                {influencer.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">{influencer.category}</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="hidden sm:flex items-center gap-8 shrink-0 group-hover:text-white">
                                        {/* Trust Score */}
                                        <div className="text-right">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={cn("text-lg font-bold", {
                                                        "text-emerald-500": influencer.trustScore >= 75,
                                                        "text-yellow-500":
                                                            influencer.trustScore >= 55 && influencer.trustScore < 75,
                                                        "text-rose-500": influencer.trustScore < 55,
                                                    })}
                                                >
                                                    {influencer.trustScore}%
                                                </span>
                                                {match(influencer.trend as "up" | "down")
                                                    .with("up", () => <TrendingUp className="h-5 w-5 text-emerald-500" />)
                                                    .with("down", () => <TrendingDown className="h-5 w-5 text-rose-500" />)
                                                    .exhaustive()}
                                            </div>
                                            <p className="text-sm text-gray-400">Trust Score</p>
                                        </div>

                                        {/* Followers */}
                                        <div className="text-right min-w-[100px]">
                                            <div className="text-lg font-bold">
                                                {(influencer.followers / 1e6).toFixed(1)}M
                                            </div>
                                            <p className="text-sm text-gray-400">Followers</p>
                                        </div>

                                        {/* Verified Claims */}
                                        <div className="text-right min-w-[100px]">
                                            <div className="text-lg font-bold">{influencer.verifiedClaims}</div>
                                            <p className="text-sm text-gray-400">Verified Claims</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Stats */}
                                <div className="flex sm:hidden flex-row items-center gap-4 w-full justify-between">
                                    {/* Trust Score */}
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={cn("text-lg font-bold", {
                                                    "text-emerald-500": influencer.trustScore >= 75,
                                                    "text-yellow-500":
                                                        influencer.trustScore >= 55 && influencer.trustScore < 75,
                                                    "text-rose-500": influencer.trustScore < 55,
                                                })}
                                            >
                                                {influencer.trustScore}%
                                            </span>
                                            {match(influencer.trend as "up" | "down")
                                                .with("up", () => <TrendingUp className="h-5 w-5 text-emerald-500" />)
                                                .with("down", () => <TrendingDown className="h-5 w-5 text-rose-500" />)
                                                .exhaustive()}
                                        </div>
                                        <p className="text-sm text-gray-400">Trust Score</p>
                                    </div>

                                    {/* Followers */}
                                    <div className="text-center">
                                        <div className="text-lg font-bold">
                                            {(influencer.followers / 1e6).toFixed(1)}M
                                        </div>
                                        <p className="text-sm text-gray-400">Followers</p>
                                    </div>

                                    {/* Verified Claims */}
                                    <div className="text-right">
                                        <div className="text-lg font-bold">{influencer.verifiedClaims}</div>
                                        <p className="text-sm text-gray-400">Verified Claims</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;
