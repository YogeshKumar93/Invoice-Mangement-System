import React, { useState } from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";

const initialFormData = {
    name: "",
    phone: "",
    address: "",
    aadhaar: "",
    image: null,
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
    { key: "phone", label: "Phone" },
    { key: "aadhaar", label: "Aadhaar" },
    { key: "address", label: "Address" },
    { key: "image", label: "Image" },
       
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
          
            phone: row.phone || "",
          aadhaar: row.aadhaar || "",
            address: row.address || "",
            image: row.image || null,

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
          { name: "name", label: "Customer Name" },
    { name: "phone", label: "Phone" },
    { name: "aadhaar", label: "Aadhaar Number" },
    { name: "address", label: "Address" },
    { name: "image", label: "Image", type: "file" },
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
                    "phone",
                    "aadhaar",
                    "address"
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