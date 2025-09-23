// import constants
import GLOBAL_CONSTANTS from "@/constants/global";
import ROUTES from "@/constants/routes";

// import icons
import { Github, Mail } from "lucide-react";

const linkStyle = "text-gray-400 hover:text-white transition-colors";

const LandingFooter = () => {
    return (
        <footer className="bg-black text-white w-full">
            <div className="px-4 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
                        {/* Brand Section */}
                        <div className="space-y-4 col-span-2 lg:col-span-1">
                            <h3 className="text-xl font-bold">
                                Progress Tracker
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Track your progress across multiple domains with
                                seamless integrations and modern analytics.
                            </p>
                        </div>

                        {/* Product Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-white">
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
                            <h4 className="font-semibold text-white">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href={ROUTES.ABOUT}
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
                            <h4 className="font-semibold text-white">
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
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <p className="text-gray-400 text-sm">
                                © 2024 Progress Tracker. All rights reserved.
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

                            {/* Legal Links */}
                            <div className="flex items-center gap-6 text-sm">
                                <a
                                    href={`${GLOBAL_CONSTANTS.PRIVACY_POLICY_URL}`}
                                    className={linkStyle}
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href={`${GLOBAL_CONSTANTS.TERMS_OF_SERVICE_URL}`}
                                    className={linkStyle}
                                >
                                    Terms of Service
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
