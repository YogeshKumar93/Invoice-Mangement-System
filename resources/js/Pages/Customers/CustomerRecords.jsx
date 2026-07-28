import React from "react";
import {
    Box,
    Paper,
    Grid,
    Typography,
    Chip,
    Card,
    CardContent,
    Divider,
} from "@mui/material";
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    Receipt as ReceiptIcon,
    Payment as PaymentIcon,
    MoneyOff as MoneyOffIcon,
} from "@mui/icons-material";
import PaginateTable from "@/Components/Common/PaginateTable";
import { usePage } from "@inertiajs/react";

export default function CustomerRecords() {
    const { customer, records } = usePage().props;
    const props = usePage().props;

    const columns = [
        {
            key: "date",
            label: "Date",
            render: (row) =>
                new Date(row.created_at).toLocaleDateString("en-IN"),
        },
        {
            key: "items",
            label: "Items",
            render: (row) =>
                row.items?.map(
                    item => item.product?.name
                ).join(", "),
        },
        {
            key: "total_amount",
            label: "Amount",
            render: (row) => (
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        color: "success.main",
                    }}
                >
                    ₹ {row.total_amount}
                </Typography>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <Chip
                    label={row.status}
                    size="small"
                    sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        bgcolor: row.status === "Paid" ? "success.light" : "warning.light",
                        color: row.status === "Paid" ? "success.dark" : "warning.dark",
                        borderRadius: "9999px",
                        px: 1,
                    }}
                />
            ),
        },
    ];

    console.log("jkla afjia ajka", records);
    console.log("props props prp", props);

    return (
        <Box sx={{ p: 0, mt:-2 }}>

            {/* Customer Info Card */}
            <Card
                sx={{
                    borderRadius: "12px",
                    boxShadow: 1,
                    mb: 1,
                    p: 0,
                    overflow: "hidden",
                }}
            >
             <CardContent sx={{ p: 2 }}>
    <Grid container spacing={2}>
        {/* Name & Phone - Stacked vertically */}
        <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PersonIcon sx={{ color: "primary.main", fontSize: 20, mt: 0.5 }} />
                <Box>
                    <Typography variant="body2" noWrap>
                        <strong>Name:</strong> {customer?.name}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ mt: 0.5 }}>
                        {customer?.phone}
                    </Typography>
                </Box>
            </Box>
        </Grid>

        {/* Financial Metrics - in a single row */}
      <Grid item xs={12} sm={6}>
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr 1fr", sm: "1fr 1fr 1fr" },
            gap: 1,
        }}
    >
        {/* Total Transaction */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ReceiptIcon sx={{ color: "primary.main", fontSize: { xs: 16, sm: 20 }, flexShrink: 0 }} />
            <Box>
                <Typography variant="body2" display="block" color="text.secondary" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.65rem" }, lineHeight: 1.2 }}>
                    Total Transaction
                </Typography>
                <Typography variant="body3" sx={{ fontWeight: 700, color: "primary.main", fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                    ₹{customer?.total_transaction || 0}
                </Typography>
            </Box>
        </Box>

        {/* Total Payment */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PaymentIcon sx={{ color: "success.main", fontSize: { xs: 16, sm: 20 }, flexShrink: 0 }} />
            <Box>
                <Typography variant="caption" display="block" color="text.secondary" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.65rem" }, lineHeight: 1.2 }}>
                    Total Paid
                </Typography>
                <Typography variant="body3" sx={{ fontWeight: 700, color: "success.main", fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                    ₹{customer?.total_payment || 0}
                </Typography>
            </Box>
        </Box>

        {/* Total Dues */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MoneyOffIcon sx={{ color: "error.main", fontSize: { xs: 16, sm: 20 }, flexShrink: 0 }} />
            <Box>
                <Typography variant="caption" display="block" color="text.secondary" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.65rem" }, lineHeight: 1.2 }}>
                    Current Dues
                </Typography>
                <Typography variant="body3" sx={{ fontWeight: 700, color: "error.main", fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                    ₹{customer?.total_dues || 0}
                </Typography>
            </Box>
        </Box>
    </Box>
</Grid>
    </Grid>
</CardContent>
            </Card>

            {/* Records Table */}
            <PaginateTable
                title="Customer Records"
                columns={columns}
                data={records}
                searchable={true}
                searchKeys={[
                    "date",
                    "items",
                    "status",
                ]}
            />

        </Box>
    );
}