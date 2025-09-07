// import Components
import HeroBar from "@/components/landing/heroBar";
import FeaturesBar from "@/components/landing/featuresBar";
import BuildWithBar from "@/components/landing/BuildWithBar";

const LandingHomePage = () => {
    return (
        <section className="px-4 py-7 lg:py-3">
            {/* Hero Section */}
            <HeroBar />
            {/* Features Section */}
            <FeaturesBar />
            {/* Build With Section */}
            <BuildWithBar />
        </section>
    );
};

export default LandingHomePage;
