// import dependencies
import { Outlet } from "react-router";

// import components
import SideBar from "@/layout/dashboard/sideBar";
import Header from "@/layout/dashboard/header";

const DashboardMainLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <SideBar />

            {/* Main content area with header */}
            <div className="lg:pl-64">
                {/* Header */}
                <Header />

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
