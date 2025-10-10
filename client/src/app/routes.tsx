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

// import books pages
import BookListPage from "@/features/books/pages/list";
import BookEditPage from "@/features/books/pages/edit";
import BookNewPage from "@/features/books/pages/new";
import BookShowPage from "@/features/books/pages/show";

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
                element={<DashboardMainLayout />}
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
                {/* Books List Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_LIST()}
                    element={<BookListPage />}
                />
                {/* Books Edit Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_EDIT()}
                    element={<BookEditPage />}
                />
                {/* Books New Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_NEW()}
                    element={<BookNewPage />}
                />
                {/* Books Show Page */}
                <Route
                    path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS_SHOW()}
                    element={<BookShowPage />}
                />
            </Route>

            {/* Auth Main Layout */}
            <Route
                path={ROUTES_CONSTANTS.AUTH().HOME()}
                element={<AuthMainLayout />}
            >
                {/* Login Page */}
                <Route
                    path={ROUTES_CONSTANTS.AUTH().LOGIN()}
                    element={<LoginPage />}
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
        </Routes>
    );
};

export default AppRoutes;
