// import dependencies
import { Routes, Route } from "react-router";

// import layouts
import LandingMainLayout from "@/layout/landing/main";
import DashboardMainLayout from "@/layout/dashboard/main";

// import landing pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";

// import dashboard pages
import DashboardHomePage from "@/pages/dashboard/home";
import DashboardReadingPage from "@/pages/dashboard/reading";

const AppRoutes = () => {
    return (
        <Routes>
            {/* landing routes */}
            <Route element={<LandingMainLayout />}>
                {/* landing home page */}
                <Route index element={<LandingHomePage />} />
                {/* landing about page */}
                <Route path="about" element={<LandingAboutPage />} />
            </Route>

            {/* dashboard routes */}
            <Route path="dashboard">
                <Route element={<DashboardMainLayout />} />
                {/* dashboard home page */}
                <Route index element={<DashboardHomePage />} />
                {/* dashboard reading page */}
                <Route path="reading" element={<DashboardReadingPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
