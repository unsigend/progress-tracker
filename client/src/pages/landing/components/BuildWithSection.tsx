// import data
import buildWith from "@/data/landing/buildWith";

// import components
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LogoLoop from "@/components/react-bits/LogoLoop/LogoLoop";

// import hooks
import { useTheme } from "@/components/refine-ui/theme/theme-provider";

const BuildWithSection = () => {
    const { theme } = useTheme();

    // Transform buildWith data to LogoLoop format
    const logoData = buildWith.map((tech) => ({
        src: tech.url,
        alt: tech.name,
        title: tech.name,
        href: undefined,
    }));

    // Determine fade color based on theme
    const getFadeColor = () => {
        if (theme === "dark") return "#0b0b0b";
        if (theme === "light") return "#ffffff";
        return undefined;
    };

    return (
        <div className="mb-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-8">
                    <p className="text-xl text-muted-foreground font-medium">
                        Built with modern technologies
                    </p>
                </div>

                {/* Technology Logos */}
                <div className="relative overflow-hidden">
                    <LogoLoop
                        logos={logoData}
                        speed={50}
                        direction="left"
                        logoHeight={65}
                        gap={48}
                        pauseOnHover={true}
                        scaleOnHover={true}
                        fadeOut={true}
                        fadeOutColor={getFadeColor()}
                        ariaLabel="Technology stack logos"
                        className="py-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default BuildWithSection;
