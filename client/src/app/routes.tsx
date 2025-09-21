// import dependencies
import { Route, Routes } from "react-router";

// import landing pages
import LandingHomePage from "@/pages/landing/home";

// import common pages
import NotFoundPage from "@/pages/common/notFound";

function AppRoutes() {
    return (
        <Routes>
            {/* Landing Home Page */}
            <Route path="/" element={<LandingHomePage />} />

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
