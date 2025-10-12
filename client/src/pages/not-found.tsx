// import dependencies
import { Link, useNavigate } from "react-router";

// import shadcn/ui components
import { Button } from "@/components/ui/button";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import icons
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* 404 Illustration */}
                <div className="space-y-4">
                    <div className="text-8xl font-bold text-muted-foreground/20">
                        404
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-foreground">
                            Page Not Found
                        </h1>
                        <p className="text-muted-foreground">
                            The page you're looking for doesn't exist or has
                            been moved.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            asChild
                            variant="default"
                            className="w-full sm:w-auto"
                        >
                            <Button onClick={() => navigate(-1)}>
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            <Link to={ROUTES_CONSTANTS.AUTH().LOGIN()}>
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="text-sm text-muted-foreground">
                    <p>
                        Need help?{" "}
                        <Link
                            to={ROUTES_CONSTANTS.LANDING().ABOUT()}
                            className="text-primary hover:underline"
                        >
                            Contact our support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;
