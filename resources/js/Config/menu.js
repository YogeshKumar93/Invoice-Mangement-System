import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Inventory as InventoryIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";

export const menuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: DashboardIcon,
        // roles: ["admin", "staff"],
    },

    {
        title: "Users",
        url: "/auth/users",
        icon: PeopleIcon,
        // roles: ["admin", "staff"],
    },
    {
        title: "Products",
        url: "/products",
        icon: InventoryIcon,
        // roles: ["admin", "staff"],
    },

    {
        title: "Customers",
        url: "/customers",
        icon: PersonIcon,
        // roles: ["admin"],
    },

    {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
        // roles: ["admin"],
    },
];