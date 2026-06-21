import React from "react";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

interface PatientLookupProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function PatientLookup({ searchQuery, setSearchQuery }: PatientLookupProps) {
  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-ink mb-4">Patient Quick Lookup</h2>
      <div className="relative">
        <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-ink-soft/60" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-line focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden text-sm bg-paper text-ink transition-all placeholder:text-ink-soft/50"
        />
      </div>
    </div>
  );
}
