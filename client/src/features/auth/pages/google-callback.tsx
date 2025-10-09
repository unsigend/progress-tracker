// import dependencies
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";
import AUTH_CONSTANTS from "@/lib/constants/auth";

/**
 * Google Callback Page
 */
const GoogleCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            // Handle the OAuth login with the access token
            localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, access_token);
            // Redirect to dashboard or handle login
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        }
    }, [access_token, navigate]);

    return null;
};

export default GoogleCallbackPage;
