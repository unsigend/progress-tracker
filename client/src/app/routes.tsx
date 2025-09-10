// import dependencies
import { Routes, Route } from "react-router";

// import layouts
import LandingMainLayout from "@/layout/landing/main";
import DashboardMainLayout from "@/layout/dashboard/main";
import AuthMainLayout from "@/layout/auth/main";

// import landing pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";

// import dashboard pages
import DashboardHomePage from "@/pages/dashboard/home";
import DashboardReadingPage from "@/pages/dashboard/reading/home";
import DashboardCoursesPage from "@/pages/dashboard/courses";
import DashboardProjectPage from "@/pages/dashboard/projects";
import DashboardLibraryPage from "@/pages/dashboard/reading/library";
import DashboardBookDetailsPage from "@/pages/dashboard/reading/bookDetails";
import DashboardReadingAddBookPage from "@/pages/dashboard/reading/addBook";

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
            </Route>

            {/* dashboard routes */}
            <Route path="dashboard" element={<DashboardMainLayout />}>
                {/* dashboard home page */}
                <Route index element={<DashboardHomePage />} />
                {/* dashboard reading page */}
                <Route path="reading" element={<DashboardReadingPage />} />
                {/* landing library page */}
                <Route
                    path="reading/library"
                    element={<DashboardLibraryPage />}
                />
                {/* landing add book page */}
                <Route
                    path="reading/library/add"
                    element={<DashboardReadingAddBookPage />}
                />
                {/* landing book details page */}
                <Route
                    path="reading/library/:id"
                    element={<DashboardBookDetailsPage />}
                />
                {/* landing courses page */}
                <Route path="courses" element={<DashboardCoursesPage />} />
                {/* landing project page */}
                <Route path="projects" element={<DashboardProjectPage />} />
            </Route>

            {/* auth routes */}
            <Route element={<AuthMainLayout />}>
                {/* auth login page */}
                <Route path="login" element={<LoginPage />} />
                {/* auth register page */}
                <Route path="signup" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
