// import data
import stats from "@/data/landing/status";
import techIcons from "@/data/landing/techIcons";
import features from "@/data/landing/features";

// import components
import FeatureCard from "@/components/ui/featureCard";

const HeroImageBar = () => {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-2">
            <div className="flex-1 text-center lg:text-left max-w-lg lg:max-w-none">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    Progress tracking made simple
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-5 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Track your goals, monitor your achievements, and visualize
                    your growth. Built for individuals who want to stay
                    motivated and see real progress in their personal and
                    professional journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                        Get Started
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
                        Learn More
                    </button>
                </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end items-end order-first lg:order-last">
                <img
                    src="/images/Hero.png"
                    alt="Progress tracking hero illustration"
                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto"
                />
            </div>
        </section>
    );
};

const AnalyticBar = () => {
    return (
        <section className="w-full py-8 sm:py-12">
            <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Analytics Overview
                </h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Track your progress with visual insights
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index: number) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                {stat.icon}
                                <span className="text-xs font-medium text-gray-600">
                                    {stat.label}
                                </span>
                            </div>
                            <span className="text-xs text-green-600 font-semibold">
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            {stat.value}
                        </div>
                        <div className="flex justify-end">{stat.chart}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const BuildWithBar = () => {
    return (
        <section className="w-full py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        Built With
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Powered by modern technologies
                    </p>
                </div>

                <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
                    {techIcons.map((tech, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center group"
                        >
                            <div
                                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 transition-transform duration-200 ${tech.hoverColor}`}
                            >
                                <img
                                    src={tech.icon}
                                    alt={`${tech.name} logo`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2 sm:mt-3 text-center">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesBar = () => {
    return (
        <section className="w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6">
                Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.id}
                        icon={feature.icon}
                        title={feature.title}
                        text={feature.text}
                    />
                ))}
            </div>
        </section>
    );
};

const Home = () => {
    return (
        <section className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
            <HeroImageBar />
            <AnalyticBar />
            <FeaturesBar />
            <BuildWithBar />
        </section>
    );
};

export default Home;
