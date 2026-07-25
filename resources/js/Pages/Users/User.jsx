import React, { useState } from "react";
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
    Chip,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const columns = [
          {
        key: "created_at",        // ✅ created_at key
        label: "Created At",      // ✅ Label
        render: (row) => {        // ✅ Render function
            if (!row.created_at) return "N/A";
            return new Date(row.created_at).toLocaleDateString("en-GB", {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        },
    },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <Chip
                    label={row.status ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        bgcolor: row.status ? "success.light" : "error.light",
                        // color: row.status ? "success.dark" : "error.dark",
                         color: "white", 
                        borderRadius: "9999px",
                        px: 1,
                    }}
                />
            ),
        },
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
            email: row.email || "",
            phone: row.phone || "",
            // password: row.password || "",
            status: row.status ?? true,
        });

        setOpenModal(true);
    };

    const handleDeleteClick = (row) => {
        setUserToDelete(row);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        await apiCall({
            url: `/auth/users/${userToDelete.id}`,
            method: "DELETE",
            reload: true,
        });
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
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
                url: `/auth/users/${editId}`,
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

    const formFields = [
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "phone", label: "Phone", required: true },
        { name: "password", label: "Password", required: editMode ? false : true },
    ];

    return (
        <>
            <PaginateTable
                apiEndpoint="/auth/users"
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
                    Delete User
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "text.secondary" }}>
                        Are you sure you want to delete user{" "}
                        <Typography component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {userToDelete?.name}
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