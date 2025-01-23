"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function JournalSelector() {
    const [journals, setJournals] = useState([
        { id: "pubmed", name: "PubMed Central", selected: true },
        { id: "nature", name: "Nature", selected: true },
        { id: "science", name: "Science", selected: true },
        { id: "cell", name: "Cell", selected: true },
        { id: "lancet", name: "The Lancet", selected: true },
        { id: "nejm", name: "New England Journal of Medicine", selected: true },
        { id: "jama", name: "JAMA Network", selected: true },
    ]);

    const toggleJournal = (id: string) => {
        setJournals(journals.map((journal) => (journal.id === id ? { ...journal, selected: !journal.selected } : journal)));
    };

    const selectAll = () => {
        setJournals(journals.map((journal) => ({ ...journal, selected: true })));
    };

    const deselectAll = () => {
        setJournals(journals.map((journal) => ({ ...journal, selected: false })));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Scientific Journals</h3>
                <div className="space-x-2 text-sm">
                    <button onClick={selectAll} className="text-emerald-500 hover:text-emerald-400">
                        Select All
                    </button>
                    <span className="text-muted-foreground">|</span>
                    <button onClick={deselectAll} className="text-muted-foreground hover:text-foreground">
                        Deselect All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {journals.map((journal) => (
                    <button
                        key={journal.id}
                        onClick={() => toggleJournal(journal.id)}
                        className={`flex items-center justify-between rounded-md border p-4 text-left transition-colors duration-500 group/journal ${
                            journal.selected
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                : "border-gray-700/30 bg-gray-800/10 text-muted-foreground hover:bg-gray-700/30"
                        }`}
                    >
                        <span className="text-sm">{journal.name}</span>
                        <CheckCircle2
                            className={`h-5 w-5 transition-opacity duration-500 ${
                                journal.selected ? "opacity-100" : "group-hover/journal:opacity-20 opacity-0"
                            }`}
                        />
                    </button>
                ))}
            </div>

            <Button
                variant="outline"
                className="w-full font-semibold text-emerald-500 hover:text-emerald-400 bg-gray-800/10 border-gray-700/30 hover:bg-gray-700/30"
            >
                + Add New Journal
            </Button>
        </div>
    );
}
