"use server";

import { influencerData } from "@/data/sample";
import { notFound } from "next/navigation";
import Image from "next/image";

import { TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { PageTitle } from "@/components/page-title";

const DetailPage = async ({ params }: { params: Promise<{ handler: string }> }) => {
    const { handler } = await params;
    const influencer = influencerData.find((i) => i.handler === handler);

    if (!influencer) {
        notFound();
    }

    const expertise = [
        "Sleep",
        "Performance",
        "Hormones",
        "Stress Management",
        "Exercise Science",
        "Light Exposure",
        "Circadian Biology",
    ];

    return (
        <div className="mx-auto max-w-5xl mb-20">
            {/* Header Section */}
            <PageTitle title={influencer.name} backLink={{ href: "/", label: "Back to Leaderboard" }} />
            <div className="flex items-start gap-6 mb-8 pb-3">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {expertise.map((topic) => (
                            <span key={topic} className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300">
                                {topic}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-400 text-base">
                        Stanford Professor of Neurobiology and Ophthalmology, focusing on neural development, brain plasticity,
                        and neural regeneration. Host of the Huberman Lab Podcast, translating neuroscience into practical tools
                        for everyday life. Known for evidence-based approaches to performance, sleep, stress management, and
                        brain optimization.
                    </p>
                </div>
                <Image src={influencer.image} alt={influencer.name} width={120} height={120} className="rounded-full" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm text-gray-400">Trust Score</span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-500">{influencer.trustScore}%</div>
                    <div className="text-sm text-gray-400">Based on {influencer.verifiedClaims} verified claims</div>
                </div>

                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm text-gray-400">Yearly Revenue</span>
                    </div>
                    <div className="text-3xl font-bold text-white">$5.0M</div>
                    <div className="text-sm text-gray-400">Estimated earnings</div>
                </div>

                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Package className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm text-gray-400">Products</span>
                    </div>
                    <div className="text-3xl font-bold text-white">1</div>
                    <div className="text-sm text-gray-400">Recommended products</div>
                </div>

                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm text-gray-400">Followers</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{(influencer.followers / 1e6).toFixed(1)}M+</div>
                    <div className="text-sm text-gray-400">Total following</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700/30 mb-8">
                <div className="flex space-x-8">
                    <button className="px-4 py-2 text-emerald-500 border-b-2 border-emerald-500">Claims Analysis</button>
                    <button className="px-4 py-2 text-gray-400 hover:text-gray-300">Recommended Products</button>
                    <button className="px-4 py-2 text-gray-400 hover:text-gray-300">Monetization</button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search claims..."
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
                <div className="text-sm text-gray-400 mb-2">Categories</div>
                <div className="flex flex-wrap gap-2 gap-y-3 text-sm">
                    <button className="px-4 py-2 rounded-full bg-emerald-500 text-white">All Categories</button>
                    {expertise.map((category) => (
                        <button key={category} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700">
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
