// import data
import buildWith from "@/data/landing/buildWith";

const BuildWithBar = () => {
    return (
        <div className="mb-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-8">
                    <p className="text-lg text-muted-foreground font-medium">
                        Built with modern technologies
                    </p>
                </div>

                {/* Technology Logos */}
                <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
                    {buildWith.map((tech, index) => (
                        <div
                            key={index}
                            className="group flex items-center justify-center transition-all duration-300 hover:scale-90"
                        >
                            <img
                                src={tech.url}
                                alt={tech.name}
                                className="h-12 w-auto transition-all duration-300"
                                title={tech.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BuildWithBar;
