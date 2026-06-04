import React, { useState } from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
    gst_number: "",
    status: true,
};

export default function Customer({ customers }) {
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const columns = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "gst_number", label: "GST Number" },
        { key: "address", label: "Address" },
        {
            key: "status",
            label: "Status",
            render: (row) =>
                row.status ? "Active" : "Inactive",
        },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <>
                    <button onClick={() => handleEditClick(row)}>
                        Edit
                    </button>

                    <button onClick={() => handleDelete(row)}>
                        Delete
                    </button>
                </>
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
            email: row.email || "",
            phone: row.phone || "",
            gst_number: row.gst_number || "",
            address: row.address || "",
            status: row.status ?? true,
        });

        setOpenModal(true);
    };

    const handleSave = async () => {
        setLoading(true);
        setErrors({});

        try {
            await apiCall({
                url: "/customers",
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
                url: `/customers/${editId}`,
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

    const handleDelete = async (row) => {
        if (!confirm("Delete this customer?")) return;

        await apiCall({
            url: `/customers/${row.id}`,
            method: "DELETE",
            reload: true,
        });
    };

    const formFields = [
        { name: "name", label: "Customer Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "phone", label: "Phone", required: true },
        { name: "gst_number", label: "GST Number", required: false },
        { name: "address", label: "Address", required: false },
    ];

    return (
        <>
            <PaginateTable
                apiEndpoint="/customers"
                title="Customers"
                columns={columns}
                data={customers.data}
                searchable={true}
                searchKeys={[
                    "name",
                    "email",
                    "phone",
                        "address",
                    "gst_number"
                ]}
                onAdd={() => {
                    setEditMode(false);
                    setEditId(null);
                    setFormData(initialFormData);
                    setErrors({});
                    setOpenModal(true);
                }}
                addButtonText="Add Customer"
            />

            <CommonModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={editMode ? "Edit Customer" : "Add Customer"}
                fieldConfig={formFields}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                onSave={editMode ? handleEdit : handleSave}
                errors={errors}
                saveText={editMode ? "Update Customer" : "Save Customer"}
            />
        </>
    );
}