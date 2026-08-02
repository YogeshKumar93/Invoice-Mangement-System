import React, { useState } from "react";
import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControlLabel,
    Checkbox,
    Grid,
    TextField,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Visibility as VisibilityIcon,
} from "@mui/icons-material";
import PaginateTable from "@/Components/Common/PaginateTable";
import CommonModal from "@/Components/Common/CommonModal";
import { apiCall } from "@/Utils/apiCall";
import AddItemsModal from "./AddItemsModal";
import { router } from "@inertiajs/react";

const initialFormData = {
    created_at: "",
    name: "",
    phone: "",
    address: "",
    aadhaar: "",
    image: null,
    guarantor_name: "",
    guarantor_phone: "",
    guarantor_address: "",
    guarantor_relation: "",
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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [showGuarantorFields, setShowGuarantorFields] = useState(false);

    const columns = [
        {
    key: "created_at",        
    label: "Created At",      
    render: (row) =>    {
         if (!row.created_at) return "N/A";
            return new Date(row.created_at).toLocaleDateString("en-GB", {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
    }      
        
},
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "aadhaar", label: "Aadhaar" },
        { key: "address", label: "Address" },
        {
            key: "image",
            label: "Image",
            render: (row) =>
                row.image ? (
                    <Avatar
                        src={`/storage/${row.image}`}
                        alt="customer"
                        sx={{ width: 48, height: 48, borderRadius: 1 }}
                        variant="rounded"
                    />
                ) : (
                    <Chip label="No Image" size="small" variant="outlined" />
                ),
        },
        {
            key: "add_items",
            label: "Add Items",
            render: (row) => (
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleAddItems(row)}
                    startIcon={<AddIcon />}
                    sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        px: 2,
                        py: 0.5,
                        fontSize: "0.75rem"
                    }}
                >
                    Items
                </Button>
            ),
        },
        {
            key: "records",
            label: "Records",
            render: (row) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleRecords(row)}
                    startIcon={<VisibilityIcon />}
                    sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        px: 2,
                        py: 0.5,
                        fontSize: "0.75rem"
                    }}
                >
                    Records
                </Button>
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
                            "&:hover": { bgcolor: "primary.light", color: "primary.dark" },
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(row)}
                        sx={{
                            color: "error.main",
                            "&:hover": { bgcolor: "error.light", color: "error.dark" },
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
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
            guarantor_name: row.guarantor_name || "",
            guarantor_phone: row.guarantor_phone || "",
            guarantor_address: row.guarantor_address || "",
            guarantor_relation: row.guarantor_relation || "",
        });
        // Show guarantor fields if any guarantor data exists
        setShowGuarantorFields(
            !!(row.guarantor_name || row.guarantor_phone || row.guarantor_address || row.guarantor_relation)
        );
        setOpenModal(true);
    };

    const handleDeleteClick = (row) => {
        setCustomerToDelete(row);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!customerToDelete) return;

        await apiCall({
            url: `/customers/${customerToDelete.id}`,
            method: "DELETE",
            reload: true,
        });
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
    };

    const handleSave = async () => {
        setLoading(true);
        setErrors({});

        try {
            const fd = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null && formData[key] !== "") {
                    fd.append(key, formData[key]);
                }
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
                if (formData[key] !== null && formData[key] !== "") {
                    fd.append(key, formData[key]);
                }
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

    // Basic form fields (without guarantor)
    const baseFormFields = [
        { name: "name", label: "Customer Name" },
        { name: "phone", label: "Phone" },
        { name: "aadhaar", label: "Aadhaar Number" },
        { name: "address", label: "Address" },
        { name: "image", label: "Image", type: "file" },
    ];

    // If your CommonModal supports customContent prop, use this approach
    // If not, you'll need to modify the CommonModal component or create a custom modal
    const customModalContent = (
        <Box sx={{ mt: 2 }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={showGuarantorFields}
                        onChange={(e) => {
                            setShowGuarantorFields(e.target.checked);
                            if (!e.target.checked) {
                                setFormData(prev => ({
                                    ...prev,
                                    guarantor_name: "",
                                    guarantor_phone: "",
                                    guarantor_address: "",
                                    guarantor_relation: "",
                                }));
                            }
                        }}
                        color="primary"
                    />
                }
                label="Guarantor if any"
                sx={{ mb: 1 }}
            />

            {showGuarantorFields && (
                <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Guarantor Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Guarantor Name"
                                name="guarantor_name"
                                value={formData.guarantor_name}
                                onChange={handleChange}
                                error={!!errors.guarantor_name}
                                helperText={errors.guarantor_name}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Guarantor Phone"
                                name="guarantor_phone"
                                value={formData.guarantor_phone}
                                onChange={handleChange}
                                error={!!errors.guarantor_phone}
                                helperText={errors.guarantor_phone}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Guarantor Address"
                                name="guarantor_address"
                                value={formData.guarantor_address}
                                onChange={handleChange}
                                error={!!errors.guarantor_address}
                                helperText={errors.guarantor_address}
                                size="small"
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Guarantor Relation"
                                name="guarantor_relation"
                                value={formData.guarantor_relation}
                                onChange={handleChange}
                                error={!!errors.guarantor_relation}
                                helperText={errors.guarantor_relation}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );

    return (
        <>
            <PaginateTable
                apiEndpoint="/customers"
                title="Customers"
                columns={columns}
                data={customers.data}
                searchable={true}
                searchKeys={["name", "phone", "aadhaar", "address"]}
                onAdd={() => {
                    setEditMode(false);
                    setEditId(null);
                    setFormData(initialFormData);
                    setErrors({});
                    setShowGuarantorFields(false);
                    setOpenModal(true);
                }}
                addButtonText="Add Customer"
            />

           <CommonModal
    open={openModal}
    onClose={() => {
        setOpenModal(false);
        setShowGuarantorFields(false);
    }}
    title={editMode ? "Edit Customer" : "Add Customer"}
    fieldConfig={baseFormFields}
    formData={formData}
    handleChange={handleChange}
    onSave={editMode ? handleEdit : handleSave}
    errors={errors}
    saveText={editMode ? "Update Customer" : "Save Customer"}
>
    {customModalContent}
</CommonModal>

            <AddItemsModal
                open={itemModalOpen}
                onClose={() => setItemModalOpen(false)}
                customer={selectedCustomer}
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
                    fontSize: "1.1rem"
                }}>
                    Delete Customer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "text.secondary" }}>
                        Are you sure you want to delete customer{" "}
                        <Typography component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {customerToDelete?.name}
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