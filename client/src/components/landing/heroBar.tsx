// import Icons
import { Github, Download } from "lucide-react";

// import Components
import { Button } from "@/components/ui/button";

const HeroBar = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-6 text-center lg:text-left">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                        Progress Tracker
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Progress Tracker is a website to integrate all sorts of
                        progress tracking features into one place. Built with
                        modern technologies for seamless progress monitoring.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 lg:justify-start md:gap-6">
                        <Button className="w-full sm:w-auto">
                            <Download className="size-4 mr-2" />
                            Download for Free
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto">
                            <Github className="size-4 mr-2" />
                            GitHub Repo
                        </Button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center lg:justify-end">
                    <img
                        src="/image/hero.png"
                        alt="Progress Tracker Hero Illustration"
                        className="w-full max-w-md lg:max-w-sm xl:max-w-md h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroBar;
