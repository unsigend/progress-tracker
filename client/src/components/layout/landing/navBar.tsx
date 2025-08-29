// import dependencies
import { useState } from "react";
import { Link } from "react-router";

// import components
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
                        <Button
                            variant="link"
                            className="text-base cursor-pointer"
                            asChild
                        >
                            <Link to="/">Home</Link>
                        </Button>
                        <Button
                            variant="link"
                            className="text-base cursor-pointer"
                            asChild
                        >
                            <Link to="/about">About</Link>
                        </Button>
                        <Button
                            variant="link"
                            className="text-base cursor-pointer"
                            asChild
                        >
                            <Link to="/">Contact</Link>
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
                                asChild
                                variant="ghost"
                                className="justify-start text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to="/">Home</Link>
                            </Button>

                            <Button
                                asChild
                                variant="ghost"
                                className="justify-start text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to="/about">About</Link>
                            </Button>

                            <Button
                                asChild
                                variant="ghost"
                                className="justify-start text-base"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link to="/">Contact</Link>
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
