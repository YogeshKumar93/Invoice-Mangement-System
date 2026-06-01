import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { apiCall } from "@/utils/apiCall";

export default function EditProduct({ product }) {

    const [loading, setLoading] = useState(false);

    const { data, setData } = useForm({
        name: "",
        sku: "",
        hsn_code: "",
        price: "",
        gst: "",
        description: "",
        status: true,
    });

    useEffect(() => {
        if (product) {
            setData({
                name: product.name || "",
                sku: product.sku || "",
                hsn_code: product.hsn_code || "",
                price: product.price || "",
                gst: product.gst || "",
                description: product.description || "",
                status: product.status ?? true,
            });
        }
    }, [product]);

    // UPDATE
    const updateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        await apiCall({
            method: "PUT",
            url: `/products/${product.id}`,
            data,
        });

        window.location.href = "/products";
    };

    // DELETE
    const deleteProduct = async () => {

        if (!confirm("Delete this product?")) return;

        await apiCall({
            method: "DELETE",
            url: `/products/${product.id}`,
        });

        window.location.href = "/products";
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Edit Product</h2>

            <form onSubmit={updateProduct}>

                <input
                    value={data.name}
                    onChange={e => setData("name", e.target.value)}
                    placeholder="Product Name"
                />

                <input
                    value={data.sku}
                    onChange={e => setData("sku", e.target.value)}
                    placeholder="SKU"
                />

                <input
                    value={data.price}
                    onChange={e => setData("price", e.target.value)}
                    placeholder="Price"
                />

                <input
                    value={data.gst}
                    onChange={e => setData("gst", e.target.value)}
                    placeholder="GST"
                />

                <textarea
                    value={data.description}
                    onChange={e => setData("description", e.target.value)}
                    placeholder="Description"
                />

                <br />

                <button type="submit" disabled={loading}>
                    Update
                </button>

            </form>

            <hr />

            <button
                onClick={deleteProduct}
                style={{ background: "red", color: "white" }}
            >
                Delete Product
            </button>

        </div>
    );
}