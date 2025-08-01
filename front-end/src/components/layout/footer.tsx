/**
 * MIT License
 *
 * Copyright (c) 2025 Qiu Yixiang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Github, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    {/* Logo & Description */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                                <div className="w-4 h-4 bg-black rounded-sm transform rotate-45"></div>
                            </div>
                            <span className="text-lg font-bold">
                                Progress Tracker
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Track your goals, monitor achievements, and
                            visualize growth with our minimal progress tracking
                            solution.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/about"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/features"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/pricing"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/analytics"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/integrations"
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    Integrations
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Connect
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="https://github.com"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                            <a
                                href="mailto:contact@progresstracker.com"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-8 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2025 Progress Tracker. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="/privacy"
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Privacy
                            </a>
                            <a
                                href="/terms"
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
