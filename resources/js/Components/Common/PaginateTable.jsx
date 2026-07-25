import React, { useState, useMemo } from "react";
import CommonFilters from "./CommonFilters";
// import FilterDropdown from "./FilterDropdown"; // Import the filter component

export default function PaginateTable({
    columns = [],
    data = [],
    title = "Table",
    searchable = true,
    searchKeys = [],
    filters = [],
    onAdd,
    addButtonText = "Add New",
    pagination = true,
    pageSize = 10,
    onExport,
}) {
    const [search, setSearch] = useState("");
    const [filterValues, setFilterValues] = useState({});
    const [page, setPage] = useState(1);

    // 🔍 Search + Filter Logic
    const filteredData = useMemo(() => {
        let result = [...data];

        if (searchable && search) {
            result = result.filter((item) =>
                searchKeys.some((key) =>
                    String(item[key] ?? "")
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
            );
        }

        filters.forEach((filter) => {
            const value = filterValues[filter.key];

            if (value) {
                result = result.filter(
                    (item) => item[filter.key] === value
                );
            }
        });

        return result;
    }, [data, search, filterValues]);

    // 📄 Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = useMemo(() => {
        if (!pagination) return filteredData;

        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page]);

    // Handle filter change
    const handleFilterChange = (key, value) => {
        setFilterValues({
            ...filterValues,
            [key]: value,
        });
        setPage(1);
    };

    // Clear all filters
    const clearFilters = () => {
        setFilterValues({});
        setSearch("");
        setPage(1);
    };

    // Check if any filter is active
    const hasActiveFilters = Object.values(filterValues).some(v => v !== "") || search !== "";

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* HEADER - with Search, Filters, and Buttons in same row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-gray-100">
                <div className="flex items-center gap-4 flex-1 flex-wrap">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Total: {filteredData.length}
                        </p>
                    </div>

                    {/* Search Input */}
                    {searchable && (
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="
                                w-full md:w-64
                                px-4 py-2.5
                                border border-gray-300
                                rounded-lg
                                text-sm
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-blue-500
                            "
                        />
                    )}

                    {/* Filter Dropdowns */}
                    {filters.length > 0 && (
                        <CommonFilters
                            filters={filters}
                            filterValues={filterValues}
                            onFilterChange={handleFilterChange}
                        />
                    )}

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="
                                px-3 py-2
                                text-sm
                                text-gray-600
                                hover:text-gray-900
                                hover:bg-gray-100
                                rounded-lg
                                transition-colors
                            "
                        >
                            ✕ Clear
                        </button>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                    {onExport && (
                        <button
                            onClick={() => onExport(filteredData)}
                            className="
                                px-4 py-2
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                text-sm
                                font-medium
                                rounded-lg
                                transition-all
                                duration-200
                                shadow-sm
                                whitespace-nowrap
                            "
                        >
                            Export
                        </button>
                    )}

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="
                                px-4 py-2
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                text-sm
                                font-medium
                                rounded-lg
                                transition-all
                                duration-200
                                shadow-sm
                                whitespace-nowrap
                            "
                        >
                            {addButtonText}
                        </button>
                    )}
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="
                                        px-6 py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-gray-600
                                        border-b
                                    "
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, i) => (
                                <tr
                                    key={i}
                                    className="
                                        border-b border-gray-100
                                        hover:bg-gray-50
                                        transition-colors
                                    "
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="
                                                px-6 py-4
                                                text-sm
                                                text-gray-700
                                            "
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="
                                        py-16
                                        text-center
                                        text-gray-500
                                    "
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-4xl">
                                            📄
                                        </span>
                                        <p className="font-medium">
                                            No records found
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {pagination && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Showing{" "}
                        <span className="font-medium">
                            {paginatedData.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                            {filteredData.length}
                        </span>{" "}
                        records
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="
                                px-4 py-2
                                border border-gray-300
                                rounded-lg
                                text-sm
                                font-medium
                                hover:bg-gray-50
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            Prev
                        </button>

                        <span className="text-sm font-medium text-gray-700">
                            Page {page} of {totalPages || 1}
                        </span>

                        <button
                            disabled={
                                page === totalPages ||
                                totalPages === 0
                            }
                            onClick={() => setPage(page + 1)}
                            className="
                                px-4 py-2
                                border border-gray-300
                                rounded-lg
                                text-sm
                                font-medium
                                hover:bg-gray-50
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}