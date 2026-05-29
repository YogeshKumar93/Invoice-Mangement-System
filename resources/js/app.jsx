import "../css/app.css";
// import "./bootstrap";
import "./Utils/axiosSetup";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/theme";

import AppLayout from "@/Layouts/AppLayout";
import AuthLayout from "@/Layouts/AuthLayout";

createInertiaApp({
    title: (title) => `${title} - Invoice System`,

    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        );

        // ✅ AUTH PAGES
        if (name.startsWith("Auth/")) {
            page.default.layout =
                page.default.layout ||
                ((page) => <AuthLayout>{page}</AuthLayout>);
        }

        // ✅ ALL APP PAGES
        else {
            page.default.layout =
                page.default.layout ||
                ((page) => <AppLayout>{page}</AppLayout>);
        }

        return page;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider theme={theme}>
                <App {...props} />
            </ThemeProvider>,
        );
    },

    progress: {
        color: "#2563eb",
    },
});