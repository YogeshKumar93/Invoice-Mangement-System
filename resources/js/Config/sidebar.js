import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";

export const sidebarItems = [
    {
        title: "Dashboard",
        icon: DashboardIcon,
        route: "/dashboard",
    },

    {
        title: "Invoices",
        icon: ReceiptIcon,
        children: [
            {
                title: "All Invoices",
                route: "/invoice",
            },
            {
                title: "Create Invoice",
                route: "/invoice/create",
            },
        ],
    },

    {
        title: "Clients",
        icon: PeopleIcon,
        route: "/client",
    },
];