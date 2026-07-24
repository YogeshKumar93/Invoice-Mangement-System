import { useState } from "react";
import { apiCall } from "./api";

const useApi = () => {
    const [loading, setLoading] = useState(false);

    const callApi = async (config) => {
        setLoading(true);

        try {
            return await apiCall(config);
        } finally {
            setLoading(false);
        }
    };

    return {
        callApi,
        loading,
    };
};

export default useApi;