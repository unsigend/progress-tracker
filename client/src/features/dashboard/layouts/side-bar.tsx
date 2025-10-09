// import dependencies
import { Link, useLocation } from "react-router";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import components
import Logo from "@/components/common/Logo";

// import shadcn/ui components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// import icons
import { Settings } from "lucide-react";

// import data
import navigation from "@/features/dashboard/data/navigation";

// import utils
import { cn } from "@/lib/utils";

// import types
import type { UserResponseDto } from "@/lib/api/api";

const SideBar = ({
    isOpen,
    setIsOpen,
    user,
    isLoading,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    user: UserResponseDto;
    isLoading: boolean;
}) => {
    // get the location
    const location = useLocation();

    // check if the route is active
    const isActiveRoute = (href: string) => {
        if (href === ROUTES_CONSTANTS.DASHBOARD().HOME()) {
            return location.pathname === ROUTES_CONSTANTS.DASHBOARD().HOME();
        }
        return location.pathname.startsWith(href);
    };

    // handle the link click
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
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

                        {navigation.map((item) => {
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
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <Spinner className="h-8 w-8 text-sidebar-foreground/70" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-sidebar-foreground/70 truncate">
                                        Loading...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 relative">
                                <Avatar>
                                    <AvatarImage
                                        src={user.avatar_url}
                                        alt={"user avatar"}
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                        key={user.avatar_url}
                                    />
                                    <AvatarFallback>
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-sidebar-foreground/70 truncate">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Settings Button */}
                                <Link
                                    to={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
