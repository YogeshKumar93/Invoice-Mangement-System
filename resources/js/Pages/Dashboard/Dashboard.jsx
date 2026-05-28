// import { Grid, Card, CardContent, Typography } from "@mui/material";

import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function Index({ stats }) {
    const cards = [
        {
            title: "Total Invoices",
            value: stats.totalInvoices,
        },
        {
            title: "Paid Invoices",
            value: stats.paidInvoices,
        },
        {
            title: "Pending Invoices",
            value: stats.pendingInvoices,
        },
        {
            title: "Revenue",
            value: `₹ ${stats.revenue}`,
        },
    ];

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid  item xs={12} md={3} key={card.title}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2">
                                {card.title}
                            </Typography>

                            <Typography variant="h5" fontWeight={700}>
                                {card.value}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}