import React, { useState, useMemo } from "react";

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

        // Search
        if (searchable && search) {
            result = result.filter((item) =>
                searchKeys.some((key) =>
                    String(item[key])
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
            );
        }

        // Filters
        filters.forEach((filter) => {
            const value = filterValues[filter.key];
            if (value) {
                result = result.filter((item) => item[filter.key] === value);
            }
        });

        return result;
    }, [data, search, filterValues]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = useMemo(() => {
        if (!pagination) return filteredData;
        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page]);

    return (
        <div className="bg-white p-4 rounded-xl shadow">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>

                <div className="flex gap-2">
                    {onExport && (
                        <button
                            onClick={() => onExport(filteredData)}
                            className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                            Export
                        </button>
                    )}

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                            {addButtonText}
                        </button>
                    )}
                </div>
            </div>

            {/* SEARCH + FILTERS */}
            <div className="flex gap-3 mb-4 flex-wrap">

                {searchable && (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border p-2 rounded w-64"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                )}

                {filters.map((filter) => (
                    <select
                        key={filter.key}
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setFilterValues({
                                ...filterValues,
                                [filter.key]: e.target.value,
                            })
                        }
                    >
                        <option value="">{filter.label}</option>
                        {filter.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ))}
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="p-2 text-left">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map((row, i) => (
                            <tr key={i} className="border-t">
                                {columns.map((col) => (
                                    <td key={col.key} className="p-2">
                                        {col.render
                                            ? col.render(row)
                                            : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {pagination && (
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-2 py-1 border"
                    >
                        Prev
                    </button>

                    <span>
                        {page} / {totalPages || 1}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-2 py-1 border"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}