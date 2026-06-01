import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { apiCall } from "@/utils/apiCall";

export default function AddProduct() {

    const [loading, setLoading] = useState(false);

    const { data, setData, reset } = useForm({
        name: "",
        sku: "",
        hsn_code: "",
        price: "",
        gst: "",
        description: "",
        status: true,
    });

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await apiCall({
            method: "POST",
            url: "/products",
            data,
        });

        reset();
        window.location.href = "/products";
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Add Product</h2>

            <form onSubmit={submit}>

                <input
                    placeholder="Product Name"
                    value={data.name}
                    onChange={e => setData("name", e.target.value)}
                />

                <input
                    placeholder="SKU"
                    value={data.sku}
                    onChange={e => setData("sku", e.target.value)}
                />

                <input
                    placeholder="HSN Code"
                    value={data.hsn_code}
                    onChange={e => setData("hsn_code", e.target.value)}
                />

                <input
                    placeholder="Price"
                    value={data.price}
                    onChange={e => setData("price", e.target.value)}
                />

                <input
                    placeholder="GST"
                    value={data.gst}
                    onChange={e => setData("gst", e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={data.description}
                    onChange={e => setData("description", e.target.value)}
                />

                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Product"}
                </button>

            </form>

        </div>
    );
}