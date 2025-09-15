/* eslint-disable react-hooks/exhaustive-deps */
// import dependencies
import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";

// import api
import apiClient, { setAuthToken } from "@/api/apiClient";

// import context
import UserContext from "@/context/userContext";

// import types
import type { AxiosResponse } from "axios";
import type { AuthResponseDto, ResponseUserDto } from "@/api/api";

// import types
type OAuthProvider = "github" | "google";

/**
 * useOAuthCallback hook it will handle the callback from the OAuth provider
 * @param provider - The provider to authenticate with
 * @returns {loading} - The loading state
 */
export const useOAuthCallback = (provider: OAuthProvider) => {
    // loading state
    const [loading, setLoading] = useState(true);

    // get search params for code
    const [searchParams] = useSearchParams();

    // navigate
    const navigate = useNavigate();

    // get setUser from context
    const { setUser } = useContext(UserContext) as {
        user: ResponseUserDto;
        setUser: (user: ResponseUserDto) => void;
    };

    /**
     * handleCallback function will handle the callback from the OAuth provider
     * @param code - The code to authenticate with
     */
    const handleCallback = async (code: string) => {
        try {
            const authMethod =
                provider === "github"
                    ? apiClient.api.authControllerGithubAuth
                    : apiClient.api.authControllerGoogleAuth;

            const response: AxiosResponse<AuthResponseDto> = await authMethod({
                code,
            });

            // save auth token to local storage
            localStorage.setItem("jwt-token", response.data.access_token);
            // set auth token to api client
            setAuthToken(response.data.access_token);

            // get user data
            const user: AxiosResponse<ResponseUserDto> =
                await apiClient.api.authControllerMe();
            // set user to context
            setUser(user.data);

            navigate("/dashboard");
        } catch (error) {
            console.error(`${provider} auth failed:`, error);
            navigate("/auth/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            handleCallback(code);
        } else {
            navigate("/auth/login");
        }
    }, []);

    return { loading };
};
