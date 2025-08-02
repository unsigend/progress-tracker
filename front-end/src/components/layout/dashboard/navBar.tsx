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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    BarChart3,
    Settings,
    User,
    LogOut,
    ChevronDown,
} from "lucide-react";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="container mx-auto w-full max-w-none lg:max-w-7xl px-4 sm:px-6">
                <div className="flex items-center py-4">
                    {/* Left Section: Logo + Navigation */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                                Progress Tracker
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            <Button
                                variant="ghost"
                                className="text-sm font-medium cursor-pointer"
                                asChild
                            >
                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-sm font-medium cursor-pointer"
                                asChild
                            >
                                <Link
                                    to="/dashboard/projects"
                                    className="flex items-center gap-2"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Projects
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-sm font-medium cursor-pointer"
                                asChild
                            >
                                <Link
                                    to="/dashboard/analytics"
                                    className="flex items-center gap-2"
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Analytics
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-sm font-medium cursor-pointer"
                                asChild
                            >
                                <Link
                                    to="/dashboard/settings"
                                    className="flex items-center gap-2"
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Profile Menu */}
                    <div className="hidden md:flex items-center relative ml-auto">
                        <button
                            onClick={toggleProfile}
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                John Doe
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform ${
                                    isProfileOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <div className="py-1">
                                    <Link
                                        to="/dashboard/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard/settings"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors ml-auto"
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
                    className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                        isMenuOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="border-t border-gray-200 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            {/* Mobile Navigation */}
                            <div className="space-y-1">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start text-sm font-medium h-10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-3 px-3"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start text-sm font-medium h-10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link
                                        to="/dashboard/projects"
                                        className="flex items-center gap-3 px-3"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Projects
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start text-sm font-medium h-10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link
                                        to="/dashboard/analytics"
                                        className="flex items-center gap-3 px-3"
                                    >
                                        <BarChart3 className="w-4 h-4" />
                                        Analytics
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start text-sm font-medium h-10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link
                                        to="/dashboard/settings"
                                        className="flex items-center gap-3 px-3"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-2"></div>

                            {/* Profile Section */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        John Doe
                                    </span>
                                </div>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start text-sm font-medium h-10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Link
                                        to="/dashboard/profile"
                                        className="flex items-center gap-3 px-3"
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm font-medium h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
