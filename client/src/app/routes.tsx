// import dependencies
import { Routes, Route } from "react-router";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import layouts
import LandingMainLayout from "@/features/landing/layouts/main";
import AuthMainLayout from "@/features/auth/layouts/main";
import DashboardMainLayout from "@/features/dashboard/layouts/main";

// import landing pages
import LandingHomePage from "@/features/landing/pages/home";
import LandingAboutPage from "@/features/landing/pages/about";

// import dashboard pages
import DashboardHomePage from "@/features/dashboard/pages/home";
import DashboardSettingsPage from "@/features/dashboard/pages/settings";

// import auth pages
import LoginPage from "@/features/auth/pages/login";
import RegisterPage from "@/features/auth/pages/register";
import GoogleCallbackPage from "@/features/auth/pages/google-callback";
import GithubCallbackPage from "@/features/auth/pages/github-callback";
import ResetPasswordPage from "@/features/auth/pages/reset-password";

// import books pages
import BookListPage from "@/features/books/pages/list";
import BookEditPage from "@/features/books/pages/edit";
import BookNewPage from "@/features/books/pages/new";
import BookShowPage from "@/features/books/pages/show";

// import recordings pages
import RecordingNewPage from "@/features/recordings/pages/new";
import RecordingShowPage from "@/features/recordings/pages/show";

// import reading pages
import DashboardReadingHomePage from "@/features/reading/pages/home";

// import projects pages
import DashboardProjectsHomePage from "@/features/projects/pages/home";

// import courses pages
import DashboardCoursesHomePage from "@/features/courses/pages/home";

// import general pages
import Protector from "@/pages/protector";
import NotFoundPage from "@/pages/not-found";
import RedirectDashboard from "@/pages/redirect-dashboard";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing Main Layout */}
            <Route
                path={ROUTES_CONSTANTS.LANDING().HOME()}
                element={<LandingMainLayout />}
            >
                {/* Landing Home Page */}
                <Route
                    path={ROUTES_CONSTANTS.LANDING().HOME()}
                    element={<LandingHomePage />}
                />
                {/* Landing About Page */}
                <Route
                    path={ROUTES_CONSTANTS.LANDING().ABOUT()}
                    element={<LandingAboutPage />}
                />
            </Route>

            {/* Dashboard Main Layout */}
            <Route
                path={ROUTES_CONSTANTS.DASHBOARD().HOME()}
                element={
                    <Protector>
                        <DashboardMainLayout />
                    </Protector>
                }
            >
                {/* Dashboard Home Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().HOME()}
                    element={<DashboardHomePage />}
                />
                {/* Dashboard Settings Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
                    element={<DashboardSettingsPage />}
                />

                {/* Dashboard Books Page */}
                <Route path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}>
                    {/* Books List Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_LIST()}
                        element={<BookListPage />}
                    />
                    {/* Books Edit Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_EDIT()}
                        element={<BookEditPage />}
                    />
                    {/* Books New Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_NEW()}
                        element={<BookNewPage />}
                    />
                    {/* Books Show Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .BOOKS_SHOW()}
                        element={<BookShowPage />}
                    />
                </Route>

                {/* Dashboard Reading Recordings Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().READING().RECORDINGS()}
                >
                    {/* Recording New Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .RECORDINGS_NEW()}
                        element={<RecordingNewPage />}
                    />
                    {/* Recording Show Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD()
                            .READING()
                            .RECORDINGS_SHOW()}
                        element={<RecordingShowPage />}
                    />
                </Route>

                {/* Dashboard Reading Page */}
                <Route path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}>
                    {/* Dashboard Reading Home Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}
                        element={<DashboardReadingHomePage />}
                    />
                </Route>
                {/* Dashboard Projects Page */}
                <Route path={ROUTES_CONSTANTS.DASHBOARD().PROJECTS().HOME()}>
                    {/* Dashboard Projects Home Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD().PROJECTS().HOME()}
                        element={<DashboardProjectsHomePage />}
                    />
                </Route>

                {/* Dashboard Courses Page */}
                <Route path={ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME()}>
                    {/* Dashboard Courses Home Page */}
                    <Route
                        path={ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME()}
                        element={<DashboardCoursesHomePage />}
                    />
                </Route>
            </Route>

            {/* Auth Main Layout */}
            <Route
                path={ROUTES_CONSTANTS.AUTH().HOME()}
                element={<AuthMainLayout />}
            >
                {/* Login Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().LOGIN()}
                    element={
                        <RedirectDashboard>
                            <LoginPage />
                        </RedirectDashboard>
                    }
                />
                {/* Register Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().REGISTER()}
                    element={<RegisterPage />}
                />
                {/* Google Callback Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().GOOGLE_CALLBACK()}
                    element={<GoogleCallbackPage />}
                />
                {/* Github Callback Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().GITHUB_CALLBACK()}
                    element={<GithubCallbackPage />}
                />
            </Route>

            {/* Reset Password Page*/}
            <Route
                path={ROUTES_CONSTANTS.AUTH().RESET_PASSWORD()}
                element={<ResetPasswordPage />}
            />

            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
