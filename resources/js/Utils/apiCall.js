import axios from "axios";

let toastHandler = null;
let loadingHandler = null;
let hideHandler = null;

// SETTERS
export const setToastHandler = (fn) => {
    toastHandler = fn;
};

export const setLoadingHandler = (fn) => {
    loadingHandler = fn;
};

export const setHideHandler = (fn) => {
    hideHandler = fn;
};

// MAIN API
export const apiCall = async (config) => {
    try {
        // ✅ show loader
        loadingHandler && loadingHandler("Please wait...");

        const res = await axios(config);

        // ✅ hide loader
        hideHandler && hideHandler();

        // ✅ success toast (safe)
        // if (res?.data?.message) {
        //     toastHandler && toastHandler(res.data.message, "success");
        // }

        return res.data;
    } catch (err) {
        // ✅ hide loader
        hideHandler && hideHandler();

        const response = err?.response?.data;

        const mainMessage =
            response?.message ||
            err?.message ||
            "Something went wrong";

        // ✅ HANDLE VALIDATION ERRORS (Laravel style)
        const fieldErrors = response?.errors;

        let formattedMessage = mainMessage;

        if (fieldErrors && typeof fieldErrors === "object") {
            const errorList = Object.entries(fieldErrors)
                .map(([field, messages]) => {
                    const msg = Array.isArray(messages)
                        ? messages.join(", ")
                        : messages;
                    return `${field}: ${msg}`;
                })
                .join(" | ");

            formattedMessage = `${mainMessage} → ${errorList}`;
        }

        // ❌ ONLY STRING TO TOAST (NO OBJECT)
        if (toastHandler) {
            toastHandler(formattedMessage, "error");
        }

        // ❌ THROW CLEAN ERROR ONLY
        throw new Error(formattedMessage);
    }
};
