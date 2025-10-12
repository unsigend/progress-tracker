// import hooks
import { useAuth } from "@/hooks/use-auth";

// import dependencies
import { useNavigate } from "react-router";
import { useEffect } from "react";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const Protector = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
        }
    }, [isAuthenticated, navigate]);

    // Don't render children if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default Protector;
