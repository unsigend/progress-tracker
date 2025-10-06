// import dependencies
import { Link } from "@refinedev/core";
import { useState } from "react";

// import shadcn/ui components
import { Button } from "@/components/ui/button";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

// import components
import Logo from "@/components/common/Logo";
import HamburgerButton from "@/components/common/HamburgerButton";

// extension style for shadcn/ui button
const navBarLinkStyle =
    "w-full rounded-lg hover:bg-accent/50 transition-colors duration-200";
const navBarButtonStyle =
    "w-full rounded-lg shadow-sm hover:shadow-md transition-all duration-200";

const LandingNavBar = () => {
    // state for navigation bar
    const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

    return (
        <>
            {/* navigation Bar for desktop */}
            <div className="hidden md:block container mx-auto">
                <div className="flex items-center justify-between p-4">
                    <Logo fontSize="text-xl" />
                    <div className="flex items-center gap-4">
                        <Link to={ROUTES_CONSTANTS.LANDING().HOME()}>
                            <Button
                                variant="link"
                                className="text-md cursor-pointer"
                            >
                                Home
                            </Button>
                        </Link>
                        <Link to={ROUTES_CONSTANTS.LANDING().ABOUT()}>
                            <Button
                                variant="link"
                                className="text-md cursor-pointer"
                            >
                                About
                            </Button>
                        </Link>
                        <Link to={ROUTES_CONSTANTS.LANDING().ABOUT()}>
                            <Button
                                variant="link"
                                className="text-md cursor-pointer"
                            >
                                Contact
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to={ROUTES_CONSTANTS.AUTH().SIGNUP()}>
                            <Button
                                variant="default"
                                className="cursor-pointer"
                            >
                                Signup
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* navigation Bar for mobile */}
            <div className="block md:hidden flex items-center justify-between p-4">
                <Logo fontSize="text-xl" />
                <HamburgerButton
                    isOpen={isNavBarOpen}
                    onClick={() => setIsNavBarOpen(!isNavBarOpen)}
                />
            </div>

            {/* extend navigation bar for mobile */}
            {isNavBarOpen && (
                <div
                    className="flex flex-col items-center justify-center text-center px-6 py-4 bg-background/95 
                backdrop-blur-sm animate-in fade-in-0 slide-in-from-top-2 duration-300"
                >
                    {/* main navigation list */}
                    <div className="flex flex-col gap-3 w-full mb-6">
                        <Link
                            to={ROUTES_CONSTANTS.LANDING().HOME()}
                            onClick={() => setIsNavBarOpen(false)}
                        >
                            <Button variant="link" className={navBarLinkStyle}>
                                Home
                            </Button>
                        </Link>
                        <Link
                            to={ROUTES_CONSTANTS.LANDING().ABOUT()}
                            onClick={() => setIsNavBarOpen(false)}
                        >
                            <Button variant="link" className={navBarLinkStyle}>
                                About
                            </Button>
                        </Link>
                        <Link
                            to={ROUTES_CONSTANTS.LANDING().ABOUT()}
                            onClick={() => setIsNavBarOpen(false)}
                        >
                            <Button variant="link" className={navBarLinkStyle}>
                                Contact
                            </Button>
                        </Link>
                    </div>

                    {/* login and signup buttons */}
                    <div className="flex flex-col gap-3 w-full max-w-sm">
                        <Link
                            to={ROUTES_CONSTANTS.AUTH().LOGIN()}
                            onClick={() => setIsNavBarOpen(false)}
                        >
                            <Button
                                variant="outline"
                                className={navBarButtonStyle}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link
                            to={ROUTES_CONSTANTS.AUTH().SIGNUP()}
                            onClick={() => setIsNavBarOpen(false)}
                        >
                            <Button
                                variant="default"
                                className={navBarButtonStyle}
                            >
                                Signup
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default LandingNavBar;
