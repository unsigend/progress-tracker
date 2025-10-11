// import dependencies
import { Outlet } from "react-router";
import { useState } from "react";

// import components
import SideBar from "@/features/dashboard/layouts/side-bar";
import Header from "@/features/dashboard/layouts/header";

// import hooks
import { useMe } from "@/hooks/use-me";

// import types
import type { UserResponseDto } from "@/lib/api/api";

const DashboardMainLayout = () => {
    // state for the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // hook for the current user
    const { data: user, isLoading } = useMe();

    // toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <SideBar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                user={user as UserResponseDto}
                isLoading={isLoading}
            />

            {/* Main content area with header */}
            <div className="lg:pl-64">
                {/* Header */}
                <Header
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    user={user as UserResponseDto}
                    isLoading={isLoading}
                />

                {/* Main content */}
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardMainLayout;
