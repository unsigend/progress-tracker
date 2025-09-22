// import dependencies
import { Route, Routes, Navigate } from "react-router";
import { Authenticated } from "@refinedev/core";

// import layout
import LandingMainLayout from "@/layout/landing/main";
import DashboardMainLayout from "@/layout/dashboard/main";
import AuthMainLayout from "@/layout/auth/main";

// import landing pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";

// import dashboard pages
import DashboardHomePage from "@/pages/dashboard/home";
import DashboardSettingsPage from "@/pages/dashboard/settings";
import DashboardReadingPage from "@/pages/dashboard/reading/home";

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
                {/* Landing Home Page */}
                <Route index element={<LandingHomePage />} />
                <Route path="about" element={<LandingAboutPage />} />
            </Route>

            {/* Dashboard Pages */}
            <Route
                path="dashboard"
                element={
                    <Authenticated
                        key="protected"
                        fallback={<Navigate to="/auth/login" replace />}
                    >
                        <DashboardMainLayout />
                    </Authenticated>
                }
            >
                {/* Dashboard Home Page */}
                <Route index element={<DashboardHomePage />} />

                {/* Settings Page */}
                <Route path="settings" element={<DashboardSettingsPage />} />

                {/* Reading Page */}
                <Route path="reading" element={<DashboardReadingPage />} />
            </Route>

            {/* Auth Pages */}
            <Route path="auth" element={<AuthMainLayout />}>
                {/* Login Page */}
                <Route path="login" element={<LoginPage />} />
                {/* Signup Page */}
                <Route path="signup" element={<RegisterPage />} />
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
