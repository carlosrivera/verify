"use client"

import { useState } from "react"

export function TimeRangeSelector() {
  const [selectedRange, setSelectedRange] = useState("last-month")

  const timeRanges = [
    { id: "last-week", label: "Last Week" },
    { id: "last-month", label: "Last Month" },
    { id: "last-year", label: "Last Year" },
    { id: "all-time", label: "All Time" },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">Time Range</label>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {timeRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setSelectedRange(range.id)}
            className={`rounded-md border p-2 text-sm transition-colors duration-500 ${
              selectedRange === range.id
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                : "border-gray-700/50 bg-gray-800/10 text-muted-foreground hover:bg-gray-700/30"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  )
}

