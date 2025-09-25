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

// import dashboard reading pages
import DashboardReadingPage from "@/pages/dashboard/reading/home";
import DashboardReadingLibraryPage from "@/pages/dashboard/reading/book/list";
import DashboardReadingBookDetailPage from "@/pages/dashboard/reading/book/show";
import DashboardReadingBookAddPage from "@/pages/dashboard/reading/book/new";
import DashboardReadingBookEditPage from "@/pages/dashboard/reading/book/edit";

// import dashboard projects pages
import DashboardProjectsPage from "@/pages/dashboard/projects/home";

// import dashboard courses pages
import DashboardCoursesPage from "@/pages/dashboard/courses/home";

// import auth pages
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import GoogleCallbackPage from "@/pages/auth/google-callback";

// import common pages
import NotFoundPage from "@/pages/common/notFound";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

function AppRoutes() {
    return (
        <Routes>
            {/* Landing Pages */}
            <Route
                path={ROUTES_CONSTANTS.LANDING().HOME()}
                element={<LandingMainLayout />}
            >
                {/* Landing Home Page */}
                <Route index element={<LandingHomePage />} />
                <Route
                    path={ROUTES_CONSTANTS.LANDING().ABOUT()}
                    element={<LandingAboutPage />}
                />
            </Route>

            {/* Dashboard Pages */}
            <Route
                path={ROUTES_CONSTANTS.DASHBOARD().HOME()}
                element={
                    <Authenticated
                        key="protected"
                        fallback={
                            <Navigate
                                to={ROUTES_CONSTANTS.AUTH().LOGIN()}
                                replace
                            />
                        }
                    >
                        <DashboardMainLayout />
                    </Authenticated>
                }
            >
                {/* Dashboard Home Page */}
                <Route index element={<DashboardHomePage />} />

                {/* Settings Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
                    element={<DashboardSettingsPage />}
                />

                {/* Reading Page */}
                <Route path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}>
                    <Route index element={<DashboardReadingPage />} />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_LIST()}
                        element={<DashboardReadingLibraryPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_NEW()}
                        element={<DashboardReadingBookAddPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_SHOW()}
                        element={<DashboardReadingBookDetailPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_EDIT()}
                        element={<DashboardReadingBookEditPage />}
                    />
                </Route>

                {/* Projects Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().PROJECTS().HOME()}
                    element={<DashboardProjectsPage />}
                />

                {/* Courses Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME()}
                    element={<DashboardCoursesPage />}
                />
            </Route>

            {/* Auth Pages */}
            <Route
                path={ROUTES_CONSTANTS.AUTH().HOME()}
                element={<AuthMainLayout />}
            >
                {/* Login Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().LOGIN()}
                    element={<LoginPage />}
                />
                {/* Signup Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().SIGNUP()}
                    element={<RegisterPage />}
                />
                {/* Google Callback Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().GOOGLE_CALLBACK()}
                    element={<GoogleCallbackPage />}
                />
                {/* GitHub Callback Page */}
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
