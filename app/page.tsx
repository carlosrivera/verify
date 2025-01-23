"use client";

import { Users2, CheckCircle, LineChart, Search, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { PageTitle } from "@/components/page-title";
import Image from "next/image";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";
import { influencerData } from "@/data/sample";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ResearchDialog from "@/components/research-dialog";
import Humanize from "humanize-plus";

const categories = ["Nutrition", "Fitness", "Medicine", "Mental Health", "Neuroscience"] as const;
type Category = (typeof categories)[number];
type SortOption = "rank" | "followers" | "score";

/**
 * Leaderboard page showing influencer trust rankings
 */
const LeaderboardPage = () => {
    const [selectedCategory, setSelectedCategory] = useQueryState<Category | null>("category", {
        defaultValue: null,
        parse: (value): Category | null => (categories.includes(value as Category) ? (value as Category) : null),
        serialize: (value) => value || "",
    });

    const [sortBy, setSortBy] = useQueryState<SortOption>("sort", {
        defaultValue: "rank",
        parse: (value): SortOption => (["rank", "followers", "score"].includes(value) ? (value as SortOption) : "rank"),
        serialize: (value) => value,
    });

    const [searchQuery, setSearchQuery] = useQueryState("q", {
        defaultValue: "",
        parse: (value): string => value || "",
        serialize: (value) => value,
    });

    const [isAddModalOpen, setIsAddModalOpen] = useQueryState("add", {
        defaultValue: false,
        parse: (value): boolean => value === "true",
        serialize: (value) => (value ? "true" : ""),
    });

    const filteredInfluencers = React.useMemo(() => {
        let filtered = selectedCategory
            ? influencerData.filter((influencer) => influencer.category === selectedCategory)
            : influencerData;

        if (searchQuery) {
            filtered = filtered.filter(
                (influencer) =>
                    influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    influencer.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "followers":
                    return b.followers - a.followers;
                case "score":
                    return b.trustScore - a.trustScore;
                default:
                    return 0;
            }
        });
    }, [selectedCategory, sortBy, searchQuery]);

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

                {/* Category Filter with Search and Sort Buttons */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 text-sm font-semibold flex-1">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-4 py-2 rounded-full transition-colors duration-300 border border-gray-700/30 shadow-sm",
                                        selectedCategory === category
                                            ? "bg-emerald-500 text-white hover:bg-emerald-500/80"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-colors duration-300 border border-gray-700/30 shadow-sm",
                                    !selectedCategory
                                        ? "bg-emerald-500 text-white hover:bg-emerald-500/80"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                )}
                            >
                                All
                            </button>
                        </div>

                        {/* Search and Sort Controls */}
                        <div className="flex items-center gap-2 ml-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsAddModalOpen(true)}
                                className="p-2 pr-4 aspect-square bg-emerald-500 border-gray-800/50 hover:bg-emerald-500/80 transition-all duration-300 font-semibold"
                            >
                                <Plus className="h-4 w-4 text-white" strokeWidth={2.5} />
                                Add
                            </Button>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={cn(
                                            "p-2 aspect-square bg-gray-800 border-gray-700/30 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300",
                                            searchQuery && "text-emerald-500 border-emerald-500/50"
                                        )}
                                    >
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-80 p-4 bg-gray-950/70 border border-gray-700/30 shadow-lg backdrop-blur-sm"
                                    align="end"
                                >
                                    <div className="space-y-3">
                                        <div className="space-y-4">
                                            <h4 className="font-medium leading-none text-gray-400">Search Influencers</h4>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                                <Input
                                                    type="text"
                                                    placeholder="Search by name or category..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-10 bg-gray-800/50 border-gray-700/30 text-gray-300 placeholder:text-gray-500 focus-visible:ring-emerald-500/50"
                                                />
                                                {searchQuery && (
                                                    <button
                                                        onClick={() => setSearchQuery("")}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {searchQuery ? (
                                            <div className="text-sm text-gray-400">
                                                Found {filteredInfluencers.length} results
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400/50">
                                                Search for an influencer by name or category
                                            </div>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* Sort Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="p-2 aspect-square bg-gray-800 border-gray-700/30 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                                    >
                                        <ArrowUpDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-[180px] bg-gray-950/70 border border-gray-700/30 shadow-lg rounded-lg backdrop-blur-sm"
                                >
                                    <DropdownMenuItem
                                        onClick={() => setSortBy("rank")}
                                        className="cursor-pointer flex items-center justify-between"
                                    >
                                        <span>Sort by Rank</span>
                                        {sortBy === "rank" && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortBy("followers")}
                                        className="cursor-pointer flex items-center justify-between"
                                    >
                                        <span>Sort by Followers</span>
                                        {sortBy === "followers" && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortBy("score")}
                                        className="cursor-pointer flex items-center justify-between"
                                    >
                                        <span>Sort by Trust Score</span>
                                        {sortBy === "score" && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
                                        #{influencer.rank}
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
                                            <div className="text-lg font-bold">{(influencer.followers / 1e6).toFixed(1)}M</div>
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
                                            {Humanize.compactInteger(influencer.followers, 1)}
                                        </div>
                                        <p className="text-sm text-gray-400">Followers</p>
                                    </div>

                                    {/* Verified Claims */}
                                    <div className="text-right">
                                        <div className="text-lg font-bold">
                                            {Humanize.compactInteger(influencer.verifiedClaims, 0)}
                                        </div>
                                        <p className="text-sm text-gray-400">Verified Claims</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <ResearchDialog open={isAddModalOpen} onOpenChange={(open) => setIsAddModalOpen(open)} />
        </div>
    );
};

export default LeaderboardPage;
