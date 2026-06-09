import React from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import { usePage } from "@inertiajs/react";

export default function CustomerRecords() {
    const { customer, records } = usePage().props;
    const props = usePage().props;

   const columns = [
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
        render: (row) => `₹ ${row.total_amount}`,
    },
    {
        key: "status",
        label: "Status",
    },
];

console.log("jkla afjia ajka",records);
console.log("props props prp",props);

    return (
        <div className="p-6">

            {/* Customer Info Card */}
            <div className="bg-white rounded-lg shadow p-5 mb-5">
                <h1 className="text-xl font-bold mb-3">
                    Customer Records
                </h1>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <strong>Name:</strong> {customer?.name}
                    </div>

                    <div>
                        <strong>Phone:</strong> {customer?.phone}
                    </div>

                    <div>
                        <strong>Aadhaar:</strong> {customer?.aadhaar}
                    </div>

                    <div>
                        <strong>Address:</strong> {customer?.address}
                    </div>
                </div>
            </div>

            {/* Records Table */}
            <PaginateTable
                title="Customer Ledger"
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