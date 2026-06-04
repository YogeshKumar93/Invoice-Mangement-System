import React, { useState } from "react";
import { router } from "@inertiajs/react";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";

const initialFormData = {
    name: "",
    sku: "",
    price: "",
    gst: "",
    status: true,
};

export default function Product({ products }) {
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const columns = [
        { key: "name", label: "Name" },
        { key: "sku", label: "SKU" },
        { key: "price", label: "Price" },
        { key: "gst", label: "GST" },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <button onClick={() => handleEditClick(row)}>
                    Edit
                </button>
            ),
        },
    ];

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditClick = (row) => {
        setEditMode(true);
        setEditId(row.id);

        setFormData({
            name: row.name || "",
            sku: row.sku || "",
            price: row.price || "",
            gst: row.gst || "",
            status: row.status ?? true,
        });

        setOpenModal(true);
    };

    const handleSave = async () => {
        setLoading(true);
        setErrors({});

        try {
            await apiCall({
                url: "/products",
                method: "POST",
                data: formData,
                reload: true,
            });
        } catch (error) {
            setErrors(error?.response?.data?.errors || {});
        } finally {
            setLoading(false);
            setOpenModal(false);
        }
    };

    const handleEdit = async () => {
        setLoading(true);
        setErrors({});

        try {
            await apiCall({
                url: `/products/${editId}`,
                method: "PUT",
                data: formData,
                reload: true,
            });
        } catch (error) {
            setErrors(error?.response?.data?.errors || {});
        } finally {
            setLoading(false);
            setOpenModal(false);
        }
    };

    const formFields = [
        { name: "name", label: "Product Name", required: true },
        { name: "sku", label: "SKU", required: true },
        { name: "price", label: "Price", required: true, type: "number" },
        { name: "gst", label: "GST %", required: true, type: "number" },
    ];

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
                    "gst",
                ]}
                onAdd={() => {
                    setEditMode(false);
                    setEditId(null);
                    setFormData(initialFormData);
                    setErrors({});
                    setOpenModal(true);
                }}
                addButtonText="Add Product"
            />

            <CommonModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={editMode ? "Edit Product" : "Add Product"}
                fieldConfig={formFields}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                onSave={editMode ? handleEdit : handleSave}
                errors={errors}
                saveText={editMode ? "Update Product" : "Save Product"}
            />
        </>
    );
}
