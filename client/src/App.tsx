// import dependencies
import { Route, Routes } from "react-router";

// import layouts
import LandingLayout from "@/components/layout/landing/main";
import DashboardLayout from "@/components/layout/dashboard/main";

// import pages
import HomePage from "@/components/pages/landing/home";
import DashboardHomePage from "@/components/pages/dashboard/home";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingLayout />}>
                <Route index element={<HomePage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHomePage />} />
            </Route>
        </Routes>
    );
}
