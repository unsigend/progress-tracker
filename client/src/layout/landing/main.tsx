// import dependencies
import { Outlet } from "react-router";

// import components
import LandingNavBar from "@/layout/landing/navBar";
import LandingFooter from "@/layout/landing/footer";

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
