import NavItem from "./NavItem";
import { useState, useEffect } from "react";

import logo from "@/Images/invoce logo.png";
import smallLogo from "@/Images/invoce logo.png";

import { menuItems } from "@/Config/menu";

export default function Sidebar({ open, setOpen }) {
    const [isHovering, setIsHovering] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const checkDesktop = () => {
            // Force desktop mode if width > 768px (inspect mode)
            // Ya phir hamesha desktop mode rakho for better UX
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Agar inspect mode mein hai (width kam hai but user ne manually inspect khola hai)
    // Toh bhi sidebar dikhana hai
    const shouldShowSidebar = isDesktop || open;
    const expanded = isDesktop && isHovering;

    return (
        <>
            {/* MOBILE OVERLAY */}
            {open && !isDesktop && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                onMouseEnter={() => isDesktop && setIsHovering(true)}
                onMouseLeave={() => isDesktop && setIsHovering(false)}
                style={{
                    // Force inline style for inspect mode
                    transform: shouldShowSidebar ? 'translateX(0)' : 'translateX(-100%)',
                    position: isDesktop ? 'relative' : 'fixed',
                    width: expanded ? '192px' : '80px',
                }}
                className={`
                    top-0 left-0 h-screen
                    bg-white border-r border-gray-200 shadow-lg
                    transition-all duration-300 ease-in-out
                    ${!isDesktop ? 'z-50' : ''}
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