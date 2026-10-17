"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") || "all";

  const handleFilterChange = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mb-10 flex flex-wrap gap-2 border-b border-primary-700 pb-3">
      <FilterButton
        filter="all"
        activeFilter={activeFilter}
        onClick={handleFilterChange}
      >
        All cabins
      </FilterButton>
      <FilterButton
        filter="small"
        activeFilter={activeFilter}
        onClick={handleFilterChange}
      >
        Small capacity cabins upto 3 guests
      </FilterButton>
      <FilterButton
        filter="medium"
        activeFilter={activeFilter}
        onClick={handleFilterChange}
      >
        Medium capacity cabins 4-6 guests
      </FilterButton>
      <FilterButton
        filter="large"
        activeFilter={activeFilter}
        onClick={handleFilterChange}
      >
        Large capacity cabins 7+ guests
      </FilterButton>
    </div>
  );
}

function FilterButton({ children, filter, activeFilter, onClick }) {
  const isActive = activeFilter === filter;
  return (
    <button
      type="button"
      onClick={() => onClick(filter)}
      aria-pressed={isActive}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:text-base ${
        isActive
          ? "border-accent-500 bg-accent-500 text-primary-950 shadow-sm"
          : "border-primary-700 bg-primary-900 text-primary-200 hover:border-primary-400 hover:bg-primary-800 hover:text-primary-50"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950`}
    >
      {children}
    </button>
  );
}
