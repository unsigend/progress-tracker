// import Components
import HeroBar from "@/components/modules/landing/heroBar";
import FeaturesBar from "@/components/modules/landing/featuresBar";
import BuildWithBar from "@/components/modules/landing/buildWithBar";

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
