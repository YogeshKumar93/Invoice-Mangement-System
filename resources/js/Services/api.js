import { router } from "@inertiajs/react";
import api from "./axios";

let toastHandler = null;
let loadingHandler = null;
let hideHandler = null;

// ---------------- TOAST ----------------
export const setToastHandler = (fn) => {
    toastHandler = fn;
};

// ---------------- LOADER ----------------
export const setLoadingHandler = (fn) => {
    loadingHandler = fn;
};

export const setHideHandler = (fn) => {
    hideHandler = fn;
};

// ---------------- MAIN API ----------------
export const apiCall = async (config) => {
    const {
        showLoader = true,
        showToast = true,
        reload = false,
        ...axiosConfig
    } = config;

    try {
        if (showLoader) {
            loadingHandler?.("Please wait...");
        }

        const res = await api(axiosConfig);

        if (showLoader) {
            hideHandler?.();
        }

        if (showToast && res?.data?.message) {
            toastHandler?.(res.data.message, "success");
        }

        if (reload) {
            router.reload();
        }

        return res.data;
    } catch (err) {
        if (showLoader) {
            hideHandler?.();
        }

        const response = err?.response?.data;

        const mainMessage =
            response?.message ||
            err?.message ||
            "Something went wrong";

        const fieldErrors = response?.errors;

        let formattedMessage = mainMessage;

        if (fieldErrors && typeof fieldErrors === "object") {
            formattedMessage +=
                "\n" +
                Object.entries(fieldErrors)
                    .map(([field, messages]) => {
                        const msg = Array.isArray(messages)
                            ? messages.join(", ")
                            : messages;

                        return `${field}: ${msg}`;
                    })
                    .join("\n");
        }

        if (showToast) {
            toastHandler?.(formattedMessage, "error");
        }

        if (err?.response?.status === 401) {
            localStorage.clear();
            sessionStorage.clear();

            router.visit("/login");
        }

        throw new Error(formattedMessage);
    }
};