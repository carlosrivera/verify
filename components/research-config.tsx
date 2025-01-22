"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { TimeRangeSelector } from "./time-range-selector"
import { JournalSelector } from "./journal-selector"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

interface ResearchConfigState {
  researchType: "specific" | "discover";
  influencerName: string;
  includeRevenueAnalysis: boolean;
  verifyWithJournals: boolean;
}

export const ResearchConfig = () => {
  const [state, setState] = useState<ResearchConfigState>({
    researchType: "specific",
    influencerName: "",
    includeRevenueAnalysis: true,
    verifyWithJournals: true,
  });

  const handleResearchTypeChange = (type: ResearchConfigState["researchType"]) => {
    setState((prev) => ({ ...prev, researchType: type }));
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center space-x-2">
        <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-lg font-semibold">Research Configuration</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          onClick={() => handleResearchTypeChange("specific")}
          className={`rounded-lg p-6 text-left transition-colors duration-500 ${
            state.researchType === "specific"
              ? "bg-emerald-500/10 border-emerald-500"
              : "border-gray-700/50 bg-gray-800/10 hover:bg-gray-700/30"
          } border`}
        >
          <h3 className="font-semibold">Specific Influencer</h3>
          <p className="text-sm text-muted-foreground">Research a known health influencer by name</p>
        </button>

        <button
          onClick={() => handleResearchTypeChange("discover")}
          className={`rounded-lg p-6 text-left transition-colors duration-500 ${
            state.researchType === "discover"
              ? "bg-emerald-500/10 border-emerald-500"
              : "border-gray-700/50 bg-gray-800/10 hover:bg-gray-700/30"
          } border`}
        >
          <h3 className="font-semibold">Discover New</h3>
          <p className="text-sm text-muted-foreground">Find and analyze new health influencers</p>
        </button>
      </div>

      <Collapsible className="pb-px -mb-px pt-px -mt-px" open={state.researchType === "specific"}>
        <CollapsibleContent className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden">
          <div className="space-y-2">
            <label 
              htmlFor="influencer-name" 
              className="text-sm font-semibold opacity-0 animate-fadeIn"
            >
              Influencer Name
            </label>
            <Input
              id="influencer-name"
              type="text"
              placeholder="Enter influencer name"
              value={state.influencerName}
              onChange={(e) => setState((prev) => ({ ...prev, influencerName: e.target.value }))}
              className="w-full bg-gray-950/50 border-gray-700/50 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 transition-colors duration-500 opacity-0 animate-fadeIn"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <TimeRangeSelector />

      <div className="space-y-8">
        <div>
          <label className="text-sm font-semibold">Products to Find Per Influencer</label>
          <Input
            type="number"
            defaultValue={10}
            className="mt-1.5 w-full bg-gray-950/50 border-gray-700/50 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 transition-colors duration-500"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">Set to 0 to skip product research</p>
        </div>

        <div>
          <label className="text-sm font-semibold">Claims to Analyze Per Influencer</label>
          <Input
            type="number"
            defaultValue={50}
            className="mt-1.5 w-full bg-gray-950/50 border-gray-700/50 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 transition-colors duration-500"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">Recommended: 50-100 claims for comprehensive analysis</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-semibold">Include Revenue Analysis</label>
            <p className="text-xs text-muted-foreground">Analyze monetization methods and estimate earnings</p>
          </div>
          <Switch 
            checked={state.includeRevenueAnalysis}
            onCheckedChange={(checked) => setState(prev => ({ ...prev, includeRevenueAnalysis: checked }))}
            className="bg-gray-800/10 border-gray-700/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-semibold">Verify with Scientific Journals</label>
            <p className="text-xs text-muted-foreground">Cross-reference claims with scientific literature</p>
          </div>
          <Switch 
            checked={state.verifyWithJournals}
            onCheckedChange={(checked) => setState(prev => ({ ...prev, verifyWithJournals: checked }))}
            className="bg-gray-800/10 border-gray-700/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" 
          />
        </div>
      </div>

      <Collapsible className="py-2" open={state.verifyWithJournals}>
        <CollapsibleContent className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown overflow-hidden">
          <JournalSelector />
        </CollapsibleContent>
      </Collapsible>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Notes for Research Assistant</label>
        <Textarea
          placeholder="Add any specific instructions or focus areas..."
          className="min-h-[100px] bg-gray-950/50 border-gray-700/50 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 transition-colors duration-500"
        />
      </div>

      <div className="flex justify-end">
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold">Start Research</Button>
      </div>
    </div>
  )
}

