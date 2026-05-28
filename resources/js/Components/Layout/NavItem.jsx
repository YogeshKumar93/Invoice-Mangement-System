import { Link, usePage } from "@inertiajs/react";

export default function NavItem({ item, isCollapsed }) {
    const { url } = usePage();

    const Icon = item.icon;

    const active = item.url
        ? url.startsWith(item.url)
        : false;

    return (
        <Link
            href={item.url || "#"}
            className={`
                group flex items-center gap-3
                rounded-xl px-3 py-3
                transition-all duration-200
                ${
                    active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                }
            `}
        >
            {/* ICON */}
            <div
                className={`
                    flex items-center justify-center
                    min-w-[24px]
                `}
            >
                {Icon && <Icon className="h-5 w-5" />}
            </div>

            {/* LABEL */}
            {!isCollapsed && (
                <span className="text-sm font-medium truncate">
                    {item.title}
                </span>
            )}
        </Link>
    );
}