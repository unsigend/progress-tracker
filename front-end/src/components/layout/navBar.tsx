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

import { useState } from "react";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full">
            <div className="container mx-auto w-full max-w-none lg:w-[60%] px-4 mt-4 sm:px-6">
                <div className="flex justify-between items-center py-4">
                    <Logo />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="link" className="text-base">
                            Home
                        </Button>
                        <Button variant="link" className="text-base">
                            About
                        </Button>
                        <Button variant="link" className="text-base">
                            Contact
                        </Button>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                        <Button size="sm">Sign Up</Button>
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span
                                className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                                    isMenuOpen
                                        ? "rotate-45 translate-y-1"
                                        : "-translate-y-1"
                                }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                                    isMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                            />
                            <span
                                className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                                    isMenuOpen
                                        ? "-rotate-45 -translate-y-1"
                                        : "translate-y-1"
                                }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "max-h-64 opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <div className="py-4 space-y-3 border-t border-gray-200">
                        <div className="flex flex-col space-y-2">
                            <Button
                                variant="ghost"
                                className="justify-start text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Button>
                            <Button
                                variant="ghost"
                                className="justify-start text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Button>
                            <Button
                                variant="ghost"
                                className="justify-start text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Button>
                        </div>
                        <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
