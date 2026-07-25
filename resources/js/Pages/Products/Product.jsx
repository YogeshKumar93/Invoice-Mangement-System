import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
    Button,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";

const initialFormData = {
    name: "",
    // sku: "",
    // price: "",
    // gst: "",
    // status: true,
};

export default function Product({ products }) {
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const columns = [
        { key: "name", label: "Name" },
        // { key: "sku", label: "SKU" },
        // { key: "price", label: "Price" },
        // { key: "gst", label: "GST" },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        size="small"
                        onClick={() => handleEditClick(row)}
                        sx={{
                            color: "primary.main",
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                            },
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(row)}
                        sx={{
                            color: "error.main",
                            "&:hover": {
                                bgcolor: "error.light",
                                color: "error.dark",
                            },
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
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
            // sku: row.sku || "",
            // price: row.price || "",
            // gst: row.gst || "",
            // status: row.status ?? true,
        });

        setOpenModal(true);
    };

    const handleDeleteClick = (row) => {
        setProductToDelete(row);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;

        await apiCall({
            url: `/products/${productToDelete.id}`,
            method: "DELETE",
            reload: true,
        });
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setProductToDelete(null);
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
        // { name: "sku", label: "SKU", required: true },
        // { name: "price", label: "Price", required: true, type: "number" },
        // { name: "gst", label: "GST %", required: true, type: "number" },
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
                    // "sku",
                    // "price",
                    // "gst",
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        p: 1,
                    },
                }}
            >
                <DialogTitle sx={{
                    pb: 1,
                    color: "error.main",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                }}>
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "text.secondary" }}>
                        Are you sure you want to delete product{" "}
                        <Typography component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {productToDelete?.name}
                        </Typography>
                        ? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
                    <Button
                        onClick={handleDeleteCancel}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            borderRadius: "6px",
                            px: 3,
                            py: 0.5,
                            borderColor: "grey.400",
                            color: "grey.600",
                            "&:hover": {
                                borderColor: "primary.main",
                                color: "primary.main",
                                bgcolor: "primary.light",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        color="error"
                        sx={{
                            textTransform: "none",
                            borderRadius: "6px",
                            px: 3,
                            py: 0.5,
                            "&:hover": {
                                bgcolor: "error.dark",
                            },
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}