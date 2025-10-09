// import dependencies
import { Route, Routes, Navigate } from "react-router";
import { Authenticated } from "@refinedev/core";

// import layout
import LandingMainLayout from "@/features/landing/layouts/main";
import DashboardMainLayout from "@/features/dashboard/layouts/main";
import AuthMainLayout from "@/features/auth/layouts/main";

// import landing pages
import LandingHomePage from "@/features/landing/pages/home";
import LandingAboutPage from "@/features/landing/pages/about";

// import dashboard pages
import DashboardHomePage from "@/features/dashboard/pages/home";

// import books pages
import BookListPage from "@/features/books/pages/list";
import BookShowPage from "@/features/books/pages/show";
import BookNewPage from "@/features/books/pages/new";
import BookEditPage from "@/features/books/pages/edit";

// import settings pages
import SettingsPage from "@/features/settings/pages/home";

// import reading pages
import ReadingDashboardPage from "@/features/reading/pages/home";

// import recordings pages
import RecordingNewPage from "@/features/recordings/pages/new";
import RecordingShowPage from "@/features/recordings/pages/show";

// import projects pages
import DashboardProjectsPage from "@/features/projects/pages/home";

// import courses pages
import DashboardCoursesPage from "@/features/courses/pages/home";

// import auth pages
import LoginPage from "@/features/auth/pages/login";
import RegisterPage from "@/features/auth/pages/register";
import GoogleCallbackPage from "@/features/auth/pages/google-callback";
import GithubCallbackPage from "@/features/auth/pages/github-callback";

// import common pages
import NotFoundPage from "@/pages/common/notFound";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

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
