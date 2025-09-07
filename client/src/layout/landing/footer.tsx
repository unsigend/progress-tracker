import globalConfig from "@/data/global";
import { Github, Mail } from "lucide-react";

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
                                    <a
                                        href="#features"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#pricing"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#integrations"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Integrations
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#api"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
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
                                        href="/about"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#blog"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#careers"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
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
                                    <a
                                        href="#docs"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#help"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#community"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#status"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
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
                                    href={`${globalConfig.github}`}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label="GitHub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href={`mailto:${globalConfig.email}`}
                                    className="text-gray-400 hover:text-white transition-colors"
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
                                    href={`${globalConfig.privacyPolicy}`}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href={`${globalConfig.termsOfService}`}
                                    className="text-gray-400 hover:text-white transition-colors"
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
