

import axios from "axios";

axios.defaults.withCredentials = true;

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

export default axios;