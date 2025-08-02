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

import { Link, useLocation } from "react-router-dom";
import {
    Home,
    BookOpen,
    GraduationCap,
    User,
    Settings,
    LogOut,
} from "lucide-react";

const SideBar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const menuItems = [
        {
            label: "Home",
            icon: Home,
            path: "/dashboard",
            category: "main",
        },
        {
            label: "Reading Progress",
            icon: BookOpen,
            path: "/dashboard/reading",
            category: "progress",
        },
        {
            label: "Course Progress",
            icon: GraduationCap,
            path: "/dashboard/courses",
            category: "progress",
        },
    ];

    const bottomItems = [
        {
            label: "Profile",
            icon: User,
            path: "/dashboard/profile",
        },
        {
            label: "Settings",
            icon: Settings,
            path: "/dashboard/settings",
        },
    ];

    return (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 py-4">
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <div className="w-4 h-4 bg-black rounded-sm transform rotate-45"></div>
                        </div>
                        <span className="text-lg font-bold text-white">
                            Progress Tracker
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        {/* Main Navigation */}
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors ${
                                                    isActive(item.path)
                                                        ? "bg-white text-black"
                                                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-5 w-5 shrink-0 ${
                                                        isActive(item.path)
                                                            ? "text-black"
                                                            : "text-gray-400 group-hover:text-white"
                                                    }`}
                                                />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>

                        {/* Progress Section */}
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider">
                                Progress Tracking
                            </div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {menuItems
                                    .filter(
                                        (item) => item.category === "progress"
                                    )
                                    .map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.path}>
                                                <Link
                                                    to={item.path}
                                                    className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors ${
                                                        isActive(item.path)
                                                            ? "bg-white text-black"
                                                            : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`h-5 w-5 shrink-0 ${
                                                            isActive(item.path)
                                                                ? "text-black"
                                                                : "text-gray-400 group-hover:text-white"
                                                        }`}
                                                    />
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </li>

                        {/* Bottom Section */}
                        <li className="mt-auto">
                            <ul role="list" className="-mx-2 space-y-1">
                                {bottomItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors ${
                                                    isActive(item.path)
                                                        ? "bg-white text-black"
                                                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-5 w-5 shrink-0 ${
                                                        isActive(item.path)
                                                            ? "text-black"
                                                            : "text-gray-400 group-hover:text-white"
                                                    }`}
                                                />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}

                                {/* Logout Button */}
                                <li>
                                    <button className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors w-full">
                                        <LogOut className="h-5 w-5 shrink-0" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
