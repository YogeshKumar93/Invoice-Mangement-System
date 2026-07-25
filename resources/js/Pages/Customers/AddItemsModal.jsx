import { apiCall } from "@/Utils/apiCall";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    IconButton,
    Button,
    Paper,
    Grid,
    Chip,
    Divider,
    Alert,
} from "@mui/material";
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Close as CloseIcon,
    Save as SaveIcon,
} from "@mui/icons-material";

export default function AddItemsModal({
    open,
    onClose,
    customer,
}) {
    const [items, setItems] = useState([
        {
            product_id: "",
            price: "",
        },
    ]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!open) return;

        const fetchProducts = async () => {
            try {
                const res = await apiCall({
                    url: "/customer-products",
                    method: "GET",
                });
                console.log("Products Response:", res);

                setProducts(res || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [open]);
    console.log(products);

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([
            ...items,
            {
                product_id: "",
                price: "",
            },
        ]);
    };

    const removeRow = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const totalAmount = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0),
        0
    );

    const handleSave = async () => {
        try {
            await apiCall({
                url: `/customers/${customer.id}/records`,
                method: "POST",
                data: {
                    customer_id: customer?.id,
                    items,
                },
                reload: true,
            });

            setItems([
                {
                    product_id: "",
                    price: "",
                },
            ]);

            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "12px",
                    maxHeight: "90vh",
                    overflow: "hidden",
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    px: 3,
                    py: 2,
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Add Items
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        Customer: <strong>{customer?.name}</strong>
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                        label={`₹ ${totalAmount}`}
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                    />
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: "text.secondary",
                            "&:hover": {
                                color: "error.main",
                                bgcolor: "error.light",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            {/* Body */}
            <DialogContent
                sx={{
                    px: 3,
                    py: 2,
                    maxHeight: "60vh",
                    overflowY: "auto",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {items.map((item, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                p: 1.5,
                                bgcolor: "grey.50",
                                borderRadius: "8px",
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            {/* Product Select */}
                            <FormControl size="small" sx={{ flex: 1, minWidth: 150 }}>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    value={item.product_id}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "product_id",
                                            e.target.value
                                        )
                                    }
                                    label="Product"
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <MenuItem value="">
                                        Select Product
                                    </MenuItem>
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.id}>
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Price Input */}
                            <TextField
                                type="number"
                                size="small"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "price",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    width: "120px",
                                    "& .MuiInputBase-input": {
                                        py: 0.5,
                                    },
                                }}
                                InputLabelProps={{ shrink: false }}
                            />

                            {/* Action Buttons */}
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                                <IconButton
                                    size="small"
                                    onClick={addRow}
                                    sx={{
                                        bgcolor: "success.main",
                                        color: "white",
                                        "&:hover": {
                                            bgcolor: "success.dark",
                                        },
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>

                                {items.length > 1 && (
                                    <IconButton
                                        size="small"
                                        onClick={() => removeRow(index)}
                                        sx={{
                                            bgcolor: "error.main",
                                            color: "white",
                                            "&:hover": {
                                                bgcolor: "error.dark",
                                            },
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </DialogContent>

            {/* Footer */}
            <DialogActions
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    px: 3,
                    py: 2,
                    gap: 1.5,
                }}
            >
                <Button
                    onClick={onClose}
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
                    onClick={handleSave}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        px: 3,
                        py: 0.5,
                        bgcolor: "primary.main",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    }}
                >
                    Save Items
                </Button>
            </DialogActions>
        </Dialog>
    );
}