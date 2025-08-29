// import dependencies
import { Route, Routes } from "react-router";

// import layouts
import LandingLayout from "@/components/layout/landing/main";

// import landing pages
import HomePage from "@/components/pages/landing/home";
import AboutPage from "@/components/pages/landing/about";

// import dashboard pages

export default function App() {
    return (
        <Routes>
            {/* landing routes */}
            <Route path="/" element={<LandingLayout />}>
                {/* landing home page */}
                <Route index element={<HomePage />} />

                {/* landing about page */}
                <Route path="about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
}
