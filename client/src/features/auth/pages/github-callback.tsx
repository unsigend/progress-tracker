// import dependencies
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useGo } from "@refinedev/core";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";
import AUTH_CONSTANTS from "@/features/auth/constants/auth";

/**
 * Github Callback Page
 */
const GithubCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    const go = useGo();

    useEffect(() => {
        if (access_token) {
            // Handle the OAuth login with the access token
            localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, access_token);
            // Redirect to dashboard or handle login
            go({
                to: ROUTES_CONSTANTS.DASHBOARD().HOME(),
            });
        }
    }, [access_token, go]);

    return null;
};

export default GithubCallbackPage;
