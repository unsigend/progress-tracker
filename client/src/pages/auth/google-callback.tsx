// import dependencies
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useGo } from "@refinedev/core";

// import constants
import ROUTES_CONSTANTS from "@/constants/routes";

/**
 * Google Callback Page
 */
const GoogleCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get("access_token");
    const go = useGo();

    useEffect(() => {
        if (access_token) {
            // Handle the OAuth login with the access token
            localStorage.setItem("access_token", access_token);
            // Redirect to dashboard or handle login
            go({
                to: ROUTES_CONSTANTS.DASHBOARD().HOME(),
            });
        }
    }, [access_token, go]);

    return null;
};

export default GoogleCallbackPage;
