// import dependencies
import { Outlet } from "react-router";

// import components
import SideBar from "@/layout/dashboard/sideBar";

const DashboardMainLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <SideBar />

            {/* Main content */}
            <main className="lg:pl-64">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardMainLayout;
