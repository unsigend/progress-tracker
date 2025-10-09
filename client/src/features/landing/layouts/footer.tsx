// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";
import GLOBAL_CONSTANTS from "@/lib/constants/global";

// import icons
import { Github, Mail } from "lucide-react";

const linkStyle =
    "text-muted-foreground hover:text-foreground transition-colors";

const LandingFooter = () => {
    return (
        <footer className="bg-background text-foreground w-full">
            <div className="px-4 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
                        {/* Brand Section */}
                        <div className="space-y-4 col-span-2 lg:col-span-1">
                            <h3 className="text-xl font-bold">
                                Progress Tracker
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Track your progress across multiple domains with
                                seamless integrations and modern analytics.
                            </p>
                        </div>

                        {/* Product Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Product
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#features" className={linkStyle}>
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#pricing" className={linkStyle}>
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#integrations"
                                        className={linkStyle}
                                    >
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a href="#api" className={linkStyle}>
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href={ROUTES_CONSTANTS.LANDING().ABOUT()}
                                        className={linkStyle}
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#blog" className={linkStyle}>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#careers" className={linkStyle}>
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className={linkStyle}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Resources
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#docs" className={linkStyle}>
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#help" className={linkStyle}>
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#community" className={linkStyle}>
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a href="#status" className={linkStyle}>
                                        Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-border pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <p className="text-muted-foreground text-sm">
                                © 2025 Progress Tracker. All rights reserved.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                <a
                                    href={`${GLOBAL_CONSTANTS.GITHUB}`}
                                    className={linkStyle}
                                    aria-label="GitHub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={`mailto:${GLOBAL_CONSTANTS.AUTHOR_EMAIL}`}
                                    className={linkStyle}
                                    aria-label="Email"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
