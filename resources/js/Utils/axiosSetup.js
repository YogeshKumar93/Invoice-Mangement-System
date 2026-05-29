import axios from "axios";

// ✅ cookies send karega (VERY IMPORTANT)
axios.defaults.withCredentials = true;

// ✅ CSRF token har request me fresh lega
axios.interceptors.request.use((config) => {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    if (token) {
        config.headers["X-CSRF-TOKEN"] = token;
    }

    config.headers["X-Requested-With"] = "XMLHttpRequest";

    return config;
});