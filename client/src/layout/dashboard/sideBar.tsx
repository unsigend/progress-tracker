// import dependencies
import { Link, useLocation } from "react-router";
import { useContext, useState } from "react";

// import utils
import { cn } from "@/lib/utils";

// import components
import HamburgerButton from "@/components/ui/HamburgerButton";
import Logo from "@/components/ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import data
import navigationItems from "@/data/dashboard/navigationItems";

// import context
import UserContext from "@/context/userContext";

// import types
import type { ResponseUserDto } from "@/api/api";

const SideBar = () => {
    // state for the sidebar
    const [isOpen, setIsOpen] = useState(false);

    // get user from context
    const { user } = useContext(UserContext) as {
        user: ResponseUserDto;
    };

    // get the location
    const location = useLocation();

    // check if the route is active
    const isActiveRoute = (href: string) => {
        if (href === "/dashboard") {
            return location.pathname === "/dashboard";
        }
        return location.pathname.startsWith(href);
    };

    // handle the link click
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // toggle the sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile menu button */}
            {!isOpen && (
                <div className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 sm:gap-x-6 sm:px-6 lg:hidden">
                    <HamburgerButton isOpen={isOpen} onClick={toggleSidebar} />
                </div>
            )}

            {/* Mobile sidebar overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="fixed inset-0 bg-black/20" />
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
                    "lg:translate-x-0 lg:z-40",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <div className="mb-8">
                            {/* Logo */}
                            <Logo fontSize="text-xl" />
                        </div>

                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActiveRoute(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={handleLinkClick}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                        isActive
                                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                            : "text-sidebar-foreground"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Avatar Section */}
                    <div className="border-t border-sidebar-border p-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>
                                    {user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-sidebar-foreground/70 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
