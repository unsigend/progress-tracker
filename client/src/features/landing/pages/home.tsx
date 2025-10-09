// import Components
import HeroSection from "@/features/landing/components/HeroSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import BuildWithSection from "@/features/landing/components/BuildWithSection";

const LandingHomePage = () => {
    return (
        <section className="px-4 py-7 lg:py-3">
            {/* Hero Section */}
            <HeroSection />
            {/* Features Section */}
            <FeaturesSection />
            {/* Build With Section */}
            <BuildWithSection />
        </section>
    );
};

export default LandingHomePage;
