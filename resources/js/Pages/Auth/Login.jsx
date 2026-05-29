import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { apiCall } from "@/Utils/apiCall";
// import { callApi } from "@/Utils/apiCall";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        username: "",
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

            // ✅ SUCCESS LOGIN
            console.log("LOGIN SUCCESS:", res);

            // redirect
            router.visit("/dashboard");

        } catch (error) {
            console.log("LOGIN ERROR:", error.message);

            // OPTIONAL: agar backend validation error structured hai
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
                        Login
                    </h1>

                    <form onSubmit={submit} className="space-y-4">

                        {/* USERNAME */}
                        <div>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={data.username}
                                onChange={handleChange}
                                className="w-full border px-4 py-3 rounded-xl"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full border px-4 py-3 rounded-xl pr-12"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-3"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>

                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* REMEMBER */}
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={handleChange}
                            />
                            Remember me
                        </label>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}