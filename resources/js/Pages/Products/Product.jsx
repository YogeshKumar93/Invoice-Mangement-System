import React from "react";
import { router } from "@inertiajs/react";
import PaginateTable from "@/Components/Common/PaginateTable";

export default function Product({ products }) {

    const columns=[
        {key:"name", label: "Name"},
        {key:"sku", label: "SKU"},
        {key:"price", label: "Price"},
        {key:"gst", label: "GST"},
        {key:"action",
             label: "Action",
            render:(row)=>(
                <button
                onClick={() => router.visit(`/products/${row.id}/edit`)}
                >
                    Edit
                </button>
            )
            }
    ]

    return (
        <>
        <PaginateTable
        apiEndpoint="/products"
        title="Products"
        columns={columns}
        data={products.data}
        searchable={true}
        searchKeys={[
            "name",
            "sku",
            "price",
            "gst"
        ]}
        onAdd={() => router.visit("/products/create")}
        addButtonText="Add Product"
        />
        </>
    );
}