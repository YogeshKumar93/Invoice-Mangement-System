import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { apiCall } from "@/Utils/apiCall";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        user_id: "",
        password: "",
        remember: false,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const res = await apiCall({
                url: "/login",
                method: "POST",
                data: data,
            });

            console.log("LOGIN SUCCESS:", res);
            router.visit("/dashboard");
        } catch (error) {
            console.log("LOGIN ERROR:", error.message);
            setErrors(error?.response?.data?.errors || {});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Invoice System Login
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        {/* USER ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                User ID
                            </label>
                            <input
                                name="user_id"
                                type="text"
                                placeholder="Enter User ID (e.g. MYMS1)"
                                value={data.user_id}
                                onChange={handleChange}
                                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            {errors.user_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full border px-4 py-3 rounded-xl pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* REMEMBER */}
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={handleChange}
                                className="rounded border-gray-300"
                            />
                            Remember me
                        </label>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}