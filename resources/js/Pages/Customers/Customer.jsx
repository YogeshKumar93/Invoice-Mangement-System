import React, { useState } from "react";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";
import AddItemsModal from "./AddItemsModal";
import { router } from "@inertiajs/react";

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
    const [itemModalOpen, setItemModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const columns = [
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "aadhaar", label: "Aadhaar" },
        { key: "address", label: "Address" },
        {
            key: "image",
            label: "Image",
            render: (row) =>
                row.image ? (
                    <img
                        src={`/storage/${row.image}`}
                        alt="customer"
                        className="h-12 w-12 object-cover rounded"
                    />
                ) : (
                    "No Image"
                ),
        },

        {
            key: "add_items",
            label: "Add Items",
            render: (row) => (
                <button
                    onClick={() => handleAddItems(row)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                >
                    Add Items
                </button>
            ),
        },

        {
    key: "records",
    label: "Records",
    render: (row) => (
        <button
            onClick={() => handleRecords(row)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
        >
            Records
        </button>
    ),
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
        const { name, value, files, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
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

            const fd = new FormData();

            Object.keys(formData).forEach((key) => {
                fd.append(key, formData[key]);
            });

            await apiCall({
                url: "/customers",
                method: "POST",
                data: fd,
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

            const fd = new FormData();

            Object.keys(formData).forEach((key) => {
                fd.append(key, formData[key]);
            });
            await apiCall({
                url: `/customers/${editId}`,
                method: "PUT",
                data: fd,
                reload: true,
            });
        } catch (error) {
            setErrors(error?.response?.data?.errors || {});
        } finally {
            setLoading(false);
            setOpenModal(false);
        }
    };

    const handleAddItems = (customer) => {
        setSelectedCustomer(customer);
        setItemModalOpen(true);
    };

    const handleRecords = (customer) => {
    router.visit(`/customers/${customer.id}/records`);
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


    console.log(formData.image);
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

            <AddItemsModal
                open={itemModalOpen}
                onClose={() => setItemModalOpen(false)}
                customer={selectedCustomer}
            />
        </>
    );
}