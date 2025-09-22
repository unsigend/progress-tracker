// import dependencies
import { Route, Routes } from "react-router";

// import layout
import LandingMainLayout from "@/layout/landing/main";
import DashboardMainLayout from "@/layout/dashboard/main";
import AuthMainLayout from "@/layout/auth/main";

// import landing pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";

// import dashboard pages
import DashboardHomePage from "@/pages/dashboard/home";

// import auth pages
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

// import common pages
import NotFoundPage from "@/pages/common/notFound";

function AppRoutes() {
    return (
        <Routes>
            {/* Landing Pages */}
            <Route path="/" element={<LandingMainLayout />}>
                <Route index element={<LandingHomePage />} />
                <Route path="about" element={<LandingAboutPage />} />
            </Route>

            {/* Dashboard Pages */}
            <Route path="dashboard" element={<DashboardMainLayout />}>
                <Route index element={<DashboardHomePage />} />
            </Route>

            {/* Auth Pages */}
            <Route path="auth" element={<AuthMainLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<RegisterPage />} />
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
