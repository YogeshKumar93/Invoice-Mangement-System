import React, { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    Receipt as ReceiptIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
    AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { apiCall } from "@/Utils/apiCall";

export default function Index() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall({
                url: "/dashboard/stats", // Change this URL according to your backend
                method: "GET",
            });
            setStats(response);
        } catch (err) {
            setError(err?.message || "Failed to fetch statistics");
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                {error}
            </Alert>
        );
    }

    const cards = [
        {
            title: "Total Invoices",
            value: stats?.totalInvoices || 0,
            icon: <ReceiptIcon sx={{ color: "primary.main", fontSize: 28 }} />,
            color: "primary",
        },
        {
            title: "Paid Invoices",
            value: stats?.paidInvoices || 0,
            icon: <CheckCircleIcon sx={{ color: "success.main", fontSize: 28 }} />,
            color: "success",
        },
        {
            title: "Pending Invoices",
            value: stats?.pendingInvoices || 0,
            icon: <PendingIcon sx={{ color: "warning.main", fontSize: 28 }} />,
            color: "warning",
        },
        {
            title: "Revenue",
            value: `₹ ${stats?.revenue || 0}`,
            icon: <MoneyIcon sx={{ color: "info.main", fontSize: 28 }} />,
            color: "info",
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={3} key={card.title}>
                        <Card
                            sx={{
                                borderRadius: "12px",
                                boxShadow: 1,
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 4,
                                },
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "text.secondary",
                                            fontWeight: 500,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {card.title}
                                    </Typography>
                                    {card.icon}
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: `${card.color}.main`,
                                    }}
                                >
                                    {card.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Data Table */}
            <Paper
                sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: 1,
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Invoice Details
                    </Typography>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "grey.50" }}>
                                <TableCell sx={{ fontWeight: 600 }}>Invoice ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Amount</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stats?.invoices && stats.invoices.length > 0 ? (
                                stats.invoices.map((invoice) => (
                                    <TableRow
                                        key={invoice.id}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "grey.50",
                                            },
                                        }}
                                    >
                                        <TableCell>#{invoice.id}</TableCell>
                                        <TableCell>{invoice.customer_name || invoice.customer?.name || "N/A"}</TableCell>
                                        <TableCell>
                                            {new Date(invoice.created_at).toLocaleDateString("en-IN")}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                                            ₹ {invoice.total_amount || invoice.amount || 0}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={invoice.status || "Pending"}
                                                size="small"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: "0.7rem",
                                                    bgcolor: invoice.status === "Paid"
                                                        ? "success.light"
                                                        : invoice.status === "Pending"
                                                        ? "warning.light"
                                                        : "error.light",
                                                    color: invoice.status === "Paid"
                                                        ? "success.dark"
                                                        : invoice.status === "Pending"
                                                        ? "warning.dark"
                                                        : "error.dark",
                                                    borderRadius: "9999px",
                                                    px: 1,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            No invoices found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}