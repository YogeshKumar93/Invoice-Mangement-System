import React, { useState } from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";
import { usePage } from "@inertiajs/react";

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    status: true,
};

export default function UsersPage() {

    const { users } = usePage().props;

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
            status: row.status ?? true,
        });

        setOpenModal(true);
    };

    const handleSave = async () => {
        setLoading(true);
        setErrors({});

        try {
            await apiCall({
                url: "/auth/users",
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
                url: `/users/${editId}`,
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
        if (!confirm("Delete this user?")) return;

        await apiCall({
            url: `/users/${row.id}`,
            method: "DELETE",
            reload: true,
        });
    };

    const formFields = [
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "phone", label: "Phone", required: true },
        { name: "password", label: "Password", required: editMode ? false : true },
    ];

    return (
        <>
            <PaginateTable
                title="Users"
                data={users}
                columns={columns}
                searchKeys={["name", "email", "phone"]}
                onAdd={() => {
                    setEditMode(false);
                    setEditId(null);
                    setFormData(initialFormData);
                    setErrors({});
                    setOpenModal(true);
                }}
                addButtonText="Add User"
            />

            <CommonModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={editMode ? "Edit User" : "Add User"}
                fieldConfig={formFields}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                onSave={editMode ? handleEdit : handleSave}
                errors={errors}
                saveText={editMode ? "Update User" : "Save User"}
            />
        </>
    );
}