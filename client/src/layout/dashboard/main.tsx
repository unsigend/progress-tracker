// import dependencies
import { Outlet } from "react-router";
import { useState } from "react";

// import components
import SideBar from "@/layout/dashboard/sideBar";
import Header from "@/layout/dashboard/header";

const DashboardMainLayout = () => {
    // state for the sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main content area with header */}
            <div className="lg:pl-64">
                {/* Header */}
                <Header
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
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
