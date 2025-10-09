// import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import { Spinner } from "@/components/ui/spinner";

// import components
import HamburgerButton from "@/components/common/HamburgerButton";

// import icons
import { Bell, ChevronDown, Settings, LogOut } from "lucide-react";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import types
import type { UserResponseDto } from "@/lib/api/api";

// import hooks
import { useLogout } from "@/hooks/use-auth";

const Header = ({
    isSidebarOpen,
    toggleSidebar,
    user,
    isLoading,
}: {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    user: UserResponseDto;
    isLoading: boolean;
}) => {
    // hook for the logout
    const { mutate: logout } = useLogout();

    return (
        <header
            className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b 
        border-border bg-background px-4 shadow-sm sm:px-6 lg:px-8"
        >
            {/* Left side - Hamburger button on mobile, empty space on desktop */}
            <div className="flex items-center">
                {/* Hamburger button - only visible on mobile */}
                <div className="lg:hidden">
                    <HamburgerButton
                        isOpen={isSidebarOpen}
                        onClick={toggleSidebar}
                    />
                </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center gap-x-4">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                >
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">View notifications</span>
                </Button>

                {/* Theme Selector */}
                <ThemeToggleButton />

                {/* User Menu */}
                {isLoading ? (
                    <div className="flex items-center gap-x-2 px-2 py-1.5">
                        <Spinner className="h-5 w-5 text-muted-foreground" />
                        <div className="hidden sm:block text-left">
                            <p className="text-sm text-muted-foreground">
                                Loading...
                            </p>
                        </div>
                    </div>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-x-2 px-2 py-1.5 h-auto"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={user.avatar_url}
                                        alt={"user avatar"}
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                        key={user.avatar_url}
                                    />
                                    <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-foreground">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex items-center gap-x-2 p-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={user.avatar_url}
                                        alt={"user avatar"}
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                        key={user.avatar_url}
                                    />
                                    <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                                        {user.username.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {user.username}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <a
                                    href={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
                                    className="flex items-center gap-x-2 cursor-pointer"
                                >
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
};

export default Header;
