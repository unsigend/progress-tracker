// this component is used to redirect the user to the dashboard
// if the user is already authenticated

// import dependencies
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";

const RedirectDashboard = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        }
    }, [isAuthenticated, navigate]);

    return <>{children}</>;
};

export default RedirectDashboard;
