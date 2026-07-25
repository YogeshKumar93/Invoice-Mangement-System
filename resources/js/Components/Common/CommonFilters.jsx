import React from "react";

export default function CommonFilters({ 
    filters = [], 
    filterValues = {}, 
    onFilterChange 
}) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            {filters.map((filter) => (
                <div key={filter.key} className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                    {/* Label with background */}
                    <label 
                        htmlFor={filter.key}
                        className="
                            text-xs
                            font-bold
                            text-gray-700
                            uppercase
                            tracking-wide
                            whitespace-nowrap
                        "
                    >
                        {filter.label}
                    </label>
                    
                    <select
                        id={filter.key}
                        value={filterValues[filter.key] || ""}
                        className="
                            px-2 py-1
                            border-2 border-gray-400
                            rounded-md
                            text-sm
                            font-medium
                            text-gray-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            min-w-[110px]
                            max-w-[140px]
                            bg-white
                            cursor-pointer
                            hover:border-gray-600
                            transition-colors
                            duration-200
                        "
                        onChange={(e) =>
                            onFilterChange(filter.key, e.target.value)
                        }
                    >
                        <option value="" className="font-normal text-gray-400">
                            All
                        </option>

                        {filter.options.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                                className="font-medium text-gray-700"
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}