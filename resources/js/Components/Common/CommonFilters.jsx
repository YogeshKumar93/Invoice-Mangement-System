import React from "react";

export default function CommonFilters({ 
    filters = [], 
    filterValues = {}, 
    onFilterChange 
}) {
    return (
        <>
            {filters.map((filter) => (
                <select
                    key={filter.key}
                    value={filterValues[filter.key] || ""}
                    className="
                        px-4 py-2.5
                        border border-gray-300
                        rounded-lg
                        text-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                        min-w-[150px]
                    "
                    onChange={(e) =>
                        onFilterChange(filter.key, e.target.value)
                    }
                >
                    <option value="">
                        {filter.label}
                    </option>

                    {filter.options.map((opt) => (
                        <option
                            key={opt.value}
                            value={opt.value}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
            ))}
        </>
    );
}