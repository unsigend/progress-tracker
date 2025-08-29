// import dependencies
import { Outlet } from "react-router";

// import components
import NavBar from "@/components/layout/landing/navBar";
import Footer from "@/components/layout/landing/footer";

const LandingLayout = () => {
    return (
        <div className="w-full">
            <NavBar />
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default LandingLayout;
