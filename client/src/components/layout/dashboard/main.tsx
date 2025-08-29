// import dependencies
import { Outlet } from "react-router";

// import components
import NavBar from "@/components/layout/dashboard/navBar";
import SideBar from "@/components/layout/dashboard/sideBar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <SideBar />

            {/* Main content area with proper spacing for fixed navbar and sidebar */}
            <div className="lg:pl-64 pt-16">
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
