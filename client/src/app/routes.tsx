// import dependencies
import { Route, Routes, Navigate } from "react-router";
import { Authenticated } from "@refinedev/core";

// import layout
import LandingMainLayout from "@/components/layout/landing/main";
import DashboardMainLayout from "@/components/layout/dashboard/main";
import AuthMainLayout from "@/components/layout/auth/main";

// import landing pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";

// import dashboard pages
import DashboardHomePage from "@/pages/dashboard/home";

// import feature pages
import SettingsPage from "@/features/settings/pages/SettingsPage";
import ReadingDashboardPage from "@/features/reading/pages/ReadingDashboardPage";
import BookListPage from "@/features/books/pages/BookListPage";
import BookShowPage from "@/features/books/pages/BookShowPage";
import BookNewPage from "@/features/books/pages/BookNewPage";
import BookEditPage from "@/features/books/pages/BookEditPage";
import RecordingNewPage from "@/features/recordings/pages/RecordingNewPage";
import RecordingShowPage from "@/features/recordings/pages/RecordingShowPage";

// import dashboard projects pages
import DashboardProjectsPage from "@/pages/dashboard/projects/home";

// import dashboard courses pages
import DashboardCoursesPage from "@/pages/dashboard/courses/home";

// import auth pages
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import GoogleCallbackPage from "@/features/auth/pages/GoogleCallbackPage";
import GithubCallbackPage from "@/features/auth/pages/GithubCallbackPage";

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
                    element={<SettingsPage />}
                />

                {/* Reading Page */}
                <Route path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}>
                    {/* Reading Home Page */}
                    <Route index element={<ReadingDashboardPage />} />

                    {/* Reading Recordings Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .RECORDINGS_NEW()}
                        element={<RecordingNewPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .RECORDINGS_SHOW()}
                        element={<RecordingShowPage />}
                    />

                    {/* Reading Books Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_LIST()}
                        element={<BookListPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_NEW()}
                        element={<BookNewPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_SHOW()}
                        element={<BookShowPage />}
                    />
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_EDIT()}
                        element={<BookEditPage />}
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
                <Route
                    path={ROUTES_CONSTANTS.AUTH().GITHUB_CALLBACK()}
                    element={<GithubCallbackPage />}
                />
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
