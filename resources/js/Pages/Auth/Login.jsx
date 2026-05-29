// resources/js/Pages/Auth/Login.jsx

import { Head, useForm } from "@inertiajs/react";
import {
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/login");
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">

                {/* CARD */}
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                    {/* TOP */}
                    <div className="px-8 pt-8 pb-6 text-center">

                        {/* LOGO */}
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg mb-5">
                            <span className="text-3xl font-bold text-white">
                                IMS
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome Back
                        </h1>

                        <p className="text-gray-500 mt-2 text-sm">
                            Login to your invoice management system
                        </p>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={submit}
                        className="px-8 pb-8 space-y-5"
                    >

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Enter your email"
                                className="
                                    w-full rounded-xl border border-gray-300
                                    focus:border-blue-500
                                    focus:ring-4 focus:ring-blue-100
                                    px-4 py-3
                                    outline-none
                                    transition-all duration-200
                                "
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={data.password}
                                    onChange={(e) =>
                                        setData(
                                            "password",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Enter your password"
                                    className="
                                        w-full rounded-xl border border-gray-300
                                        focus:border-blue-500
                                        focus:ring-4 focus:ring-blue-100
                                        px-4 py-3 pr-12
                                        outline-none
                                        transition-all duration-200
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="
                                        absolute right-4 top-1/2 -translate-y-1/2
                                        text-gray-400 hover:text-gray-600
                                    "
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

                        {/* REMEMBER + FORGOT */}
                        <div className="flex items-center justify-between text-sm">

                            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">

                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData(
                                            "remember",
                                            e.target.checked,
                                        )
                                    }
                                    className="rounded border-gray-300"
                                />

                                Remember me
                            </label>

                            <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Forgot Password?
                            </a>

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                w-full bg-blue-600 hover:bg-blue-700
                                text-white font-semibold
                                py-3 rounded-xl
                                transition-all duration-200
                                shadow-lg shadow-blue-200
                                disabled:opacity-50
                            "
                        >
                            {processing
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    {/* FOOTER */}
                    <div className="border-t border-gray-100 py-5 text-center bg-gray-50">

                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Invoice Management System
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}