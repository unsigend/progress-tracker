/* eslint-disable react-hooks/exhaustive-deps */
// import dependencies
import { useNavigate, useSearchParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import LoadingBar from "@/components/ui/loadingBar";

// import api
import apiClient, { setAuthToken } from "@/api/apiClient";

// import types
import type { AxiosResponse } from "axios";
import type { AuthResponseDto, ResponseUserDto } from "@/api/api";

// import context
import UserContext from "@/context/userContext";

const GoogleCallbackPage = () => {
    // loading state
    const [loading, setLoading] = useState(true);
    // use search params hook to get the code
    const [searchParams] = useSearchParams();
    // get setUser from context
    const { setUser } = useContext(UserContext) as {
        user: ResponseUserDto;
        setUser: (user: ResponseUserDto) => void;
    };
    // navigate
    const navigate = useNavigate();

    // handle google callback
    const handleGoogleCallback = async (code: string) => {
        try {
            const response: AxiosResponse<AuthResponseDto> =
                await apiClient.api.authControllerGoogleAuth({
                    code: code,
                });

            // save the token to local storage
            localStorage.setItem("jwt-token", response.data.access_token);
            // set the jwt token to the api client
            setAuthToken(response.data.access_token);
            // get the user data
            const user: AxiosResponse<ResponseUserDto> =
                await apiClient.api.authControllerMe();
            // set the user data to the context
            setUser(user.data);
            // redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Google auth failed:", error);
            navigate("/auth/login");
        } finally {
            setLoading(false);
        }
    };

    // this should be called only once
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            handleGoogleCallback(code);
        } else {
            // No code found, redirect to login
            navigate("/auth/login");
        }
    }, [code]);

    if (loading) {
        return <LoadingBar message="Authenticating with Google..." />;
    }

    return null;
};

export default GoogleCallbackPage;
