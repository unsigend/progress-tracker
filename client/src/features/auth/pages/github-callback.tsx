// import dependencies
import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";
import AUTH_CONSTANTS from "@/lib/constants/auth";

// import QueryClient
import { useQueryClient } from "@tanstack/react-query";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

/**
 * Github Callback Page
 */
const GithubCallbackPage = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            // Handle the OAuth login with the access token
            localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, access_token);
            // invalidate the user query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER().Me(),
            });
            // Redirect to dashboard or handle login
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        }
    }, [access_token, navigate, queryClient]);

    return null;
};

export default GithubCallbackPage;
