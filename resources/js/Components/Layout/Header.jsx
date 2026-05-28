// resources/js/Components/Layout/Header.jsx

import {
    Bars3Icon,
    BellIcon,
    ArrowPathIcon,
    UserCircleIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { useState, useRef, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";

export default function Header({ setOpen }) {
    const { props } = usePage();

    const user = props.auth?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef();

    // CLOSE DROPDOWN OUTSIDE CLICK
    useEffect(() => {
        const handleOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };
    }, []);

    // LOGOUT
    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* MOBILE SIDEBAR BUTTON */}
                <button
                    onClick={() => setOpen(true)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <Bars3Icon className="h-6 w-6 text-gray-700" />
                </button>

                {/* PAGE TITLE */}
                <div>
                    <h1 className="text-lg lg:text-xl font-semibold text-gray-800">
                        Invoice Management System
                    </h1>

                    <p className="text-xs text-gray-500 hidden sm:block">
                        Manage invoices, customers & reports
                    </p>
                </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 lg:gap-5">

                {/* REFRESH BUTTON */}
                <button
                    onClick={() => router.reload()}
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <ArrowPathIcon className="h-5 w-5 text-gray-600" />
                </button>

                {/* NOTIFICATION */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
                    <BellIcon className="h-5 w-5 text-gray-600" />

                    {/* RED DOT */}
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* USER DROPDOWN */}
                <div className="relative" ref={dropdownRef}>

                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                    >

                        {/* AVATAR */}
                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        {/* USER INFO */}
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-gray-800">
                                {user?.name || "User"}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user?.email || "user@email.com"}
                            </p>
                        </div>

                        <ChevronDownIcon className="h-4 w-4 text-gray-500 hidden md:block" />

                    </button>

                    {/* DROPDOWN */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">

                            {/* TOP */}
                            <div className="p-4 border-b bg-gray-50">

                                <div className="flex items-center gap-3">

                                    <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {user?.name || "User"}
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            {user?.email}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* MENU */}
                            <div className="p-2">

                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-sm text-gray-700"
                                >
                                    <UserCircleIcon className="h-5 w-5" />

                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition text-sm text-red-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                        />
                                    </svg>

                                    Logout
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}