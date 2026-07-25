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
        <Box sx={{ p: 2 }}>

            {/* Customer Info Card */}
            <Card
                sx={{
                    borderRadius: "12px",
                    boxShadow: 1,
                    mb: 2,
                    p: 0,
                    overflow: "hidden",
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    {/* <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Customer Records
                    </Typography> */}

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <PersonIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                <Typography variant="body2">
                                    <strong>Name:</strong> {customer?.name}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <PhoneIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                <Typography variant="body2">
                                    <strong>Phone:</strong> {customer?.phone}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Commented fields - Uncomment if needed */}
                        {/* <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <BadgeIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                <Typography variant="body2">
                                    <strong>Aadhaar:</strong> {customer?.aadhaar}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <HomeIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                <Typography variant="body2">
                                    <strong>Address:</strong> {customer?.address}
                                </Typography>
                            </Box>
                        </Grid> */}
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