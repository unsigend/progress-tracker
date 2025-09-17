// import dependencies
import { Routes, Route } from "react-router";

// import layouts
import LandingMainLayout from "@/layout/landing/main";
import DashboardMainLayout from "@/layout/dashboard/main";
import AuthLayout from "@/layout/auth/main";

// import landing pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";
import LandingContactPage from "@/pages/landing/contact";

// import dashboard pages
import DashboardHomePage from "@/pages/dashboard/home";
import DashboardReadingPage from "@/pages/dashboard/reading/home";
import DashboardCoursesPage from "@/pages/dashboard/courses/home";
import DashboardProjectPage from "@/pages/dashboard/projects/home";
import DashboardLibraryPage from "@/pages/dashboard/reading/library";
import DashboardBookDetailsPage from "@/pages/dashboard/reading/book-detail";
import DashboardReadingAddBookPage from "@/pages/dashboard/reading/book-add";
import DashboardSettingsPage from "@/pages/dashboard/settings";

// import auth pages
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

const AppRoutes = () => {
    return (
        <Routes>
            {/* landing routes */}
            <Route element={<LandingMainLayout />}>
                {/* landing home page */}
                <Route index element={<LandingHomePage />} />

                {/* landing about page */}
                <Route path="about" element={<LandingAboutPage />} />

                {/* landing contact page */}
                <Route path="contact" element={<LandingContactPage />} />
            </Route>

            {/* dashboard routes */}
            <Route path="dashboard" element={<DashboardMainLayout />}>
                {/* dashboard home page */}
                <Route index element={<DashboardHomePage />} />

                {/* dashboard reading page */}
                <Route path="reading" element={<DashboardReadingPage />}>
                    {/* landing library page */}
                    <Route path="library" element={<DashboardLibraryPage />}>
                        {/* landing add book page */}
                        <Route
                            path="add"
                            element={<DashboardReadingAddBookPage />}
                        />
                        {/* landing book details page */}
                        <Route
                            path=":id"
                            element={<DashboardBookDetailsPage />}
                        />
                    </Route>
                </Route>

                {/* landing courses page */}
                <Route path="courses" element={<DashboardCoursesPage />} />

                {/* landing project page */}
                <Route path="projects" element={<DashboardProjectPage />} />

                {/* landing settings page */}
                <Route path="settings" element={<DashboardSettingsPage />} />
            </Route>

            {/* auth routes */}
            <Route path="auth" element={<AuthLayout />}>
                {/* auth login page */}
                <Route path="login" element={<LoginPage />} />
                {/* auth register page */}
                <Route path="signup" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
