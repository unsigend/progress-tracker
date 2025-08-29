// import dependencies
import { Route, Routes } from "react-router";

// import layouts
import LandingLayout from "@/layout/landing/main";
import DashboardLayout from "@/layout/dashboard/main";

// import pages
import HomePage from "@/pages/landing/home";
import DashboardHomePage from "@/pages/dashboard/home";

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
