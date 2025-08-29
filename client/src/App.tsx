// import dependencies
import { Route, Routes } from "react-router";

// import layouts
import LandingLayout from "@/components/layout/landing/main";
import DashboardLayout from "@/components/layout/dashboard/main";

// import landing pages
import HomePage from "@/components/pages/landing/home";
import AboutPage from "@/components/pages/landing/about";

// import dashboard pages
import DashboardHomePage from "@/components/pages/dashboard/home";
import ReadingHomePage from "@/components/pages/dashboard/reading/home";
import ProjectHomePage from "@/components/pages/dashboard/project/home";
import CourseHomePage from "@/components/pages/dashboard/course/home";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHomePage />} />
                <Route
                    path="/dashboard/reading"
                    element={<ReadingHomePage />}
                />
                <Route
                    path="/dashboard/project"
                    element={<ProjectHomePage />}
                />
                <Route path="/dashboard/course" element={<CourseHomePage />} />
            </Route>
        </Routes>
    );
}
