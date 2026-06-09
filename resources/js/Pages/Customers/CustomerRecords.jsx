import React from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import { usePage } from "@inertiajs/react";

export default function CustomerRecords() {
    // const { customer } = usePage().props;

    // const columns = [
    //     {
    //         key: "date",
    //         label: "Date",
    //     },
    //     {
    //         key: "items",
    //         label: "Items",
    //     },
    //     {
    //         key: "amount",
    //         label: "Amount",
    //         render: (row) => (
    //             <span className="font-medium">
    //                 ₹{row.amount}
    //             </span>
    //         ),
    //     },
    //     {
    //         key: "status",
    //         label: "Status",
    //         render: (row) => (
    //             <span
    //                 className={`px-2 py-1 rounded text-xs ${
    //                     row.status === "Paid"
    //                         ? "bg-green-100 text-green-700"
    //                         : "bg-yellow-100 text-yellow-700"
    //                 }`}
    //             >
    //                 {row.status}
    //             </span>
    //         ),
    //     },
    //     {
    //         key: "edit",
    //         label: "Edit",
    //         render: (row) => (
    //             <button
    //                 className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
    //             >
    //                 Edit
    //             </button>
    //         ),
    //     },
    // ];

        const columns = [
            {
    key: "items",
    label: "Items",
    render: (row) =>
        row.items
            .map(item =>
                item.product.name
            )
            .join(", ")
},];

   const { customer, records} = usePage().props;

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