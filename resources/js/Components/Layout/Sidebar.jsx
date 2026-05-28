import NavItem from "./NavItem";
import { useState } from "react";

import logo from "@/Images/invoce logo.png";
import smallLogo from "@/Images/invoce logo.png";

import { menuItems } from "@/Config/menu";

export default function Sidebar({ open, setOpen }) {
    const [isHovering, setIsHovering] = useState(false);

    // Desktop width
    const expanded = isHovering;

    return (
        <>
            {/* MOBILE OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`
                    fixed lg:static z-50 top-0 left-0 h-screen
                    bg-white border-r border-gray-200 shadow-lg
                    transition-all duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    full lg:translate-x-0
                    ${expanded ? "w-48" : "w-20"}
                `}
            >
                {/* LOGO */}
                <div
                    className={`
                        h-16 border-b border-gray-100
                        flex items-center
                        ${expanded ? "justify-start px-5" : "justify-center"}
                    `}
                >
                    {expanded ? (
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-9 w-40 object-contain"
                            
                            
                        />
                    ) : (
                        <img
                            src={smallLogo}
                            alt="Logo"
                            className="h-9 object-contain"
                        />
                    )}
                </div>

                {/* MENU */}
                <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.title}
                            item={item}
                            isCollapsed={!expanded}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}