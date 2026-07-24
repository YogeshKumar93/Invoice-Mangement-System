import React from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import { usePage } from "@inertiajs/react";

export default function CustomerRecords() {
    const { customer, records } = usePage().props;
    const props = usePage().props;

   const columns = [
     {
        key: "date",
        label: "Date",
        render: (row) =>
            new Date(row.created_at).toLocaleDateString("en-IN"),
    },
    {
        key: "items",
        label: "Items",
        render: (row) =>
            row.items?.map(
                item => item.product?.name
            ).join(", "),
    },
    {
        key: "total_amount",
        label: "Amount",
        render: (row) => (
            <span className="font-semibold text-green-600">
                ₹ {row.total_amount}
            </span>
        ),
    },
      {
        key: "status",
        label: "Status",
        render: (row) => (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
            >
                {row.status}
            </span>
        ),
    },
];

console.log("jkla afjia ajka",records);
console.log("props props prp",props);

    return (
        <div className="p-2">

            {/* Customer Info Card */}
            <div className="bg-white rounded-lg shadow p-2 mb-2">
                {/* <h1 className="text-xl font-bold mb-2">
                    Customer Records
                </h1> */}

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <strong>Name:</strong> {customer?.name}
                    </div>

                    <div>
                        <strong>Phone:</strong> {customer?.phone}
                    </div>
{/* 
                    <div>
                        <strong>Aadhaar:</strong> {customer?.aadhaar}
                    </div>

                    <div>
                        <strong>Address:</strong> {customer?.address}
                    </div> */}
                </div>
            </div>

            {/* Records Table */}
            <PaginateTable
                title="Customer Records"
                columns={columns}
                data={records}
                searchable={true}
                searchKeys={[
                    "date",
                    "items",
                    "status",
                ]}
            />

        </div>
    );
}