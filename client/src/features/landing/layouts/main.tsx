// import dependencies
import { Outlet } from "react-router";

// import components
import LandingNavBar from "@/features/landing/layouts/navBar";
import LandingFooter from "@/features/landing/layouts/footer";

const LandingMainLayout = () => {
    return (
        <section>
            <section className="container mx-auto min-h-screen">
                <LandingNavBar />
                <Outlet />
            </section>
            <LandingFooter />
        </section>
    );
};

export default LandingMainLayout;
