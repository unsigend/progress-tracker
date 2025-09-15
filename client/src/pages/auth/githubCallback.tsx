// import dependencies
import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";

// import api
import apiClient, { setAuthToken } from "@/api/apiClient";

// import types
import type { AuthResponseDto, ResponseUserDto } from "@/api/api";
import type { AxiosResponse } from "axios";

// import context
import UserContext from "@/context/userContext";

const GithubCallbackPage = () => {
    // get setUser from context
    const { setUser } = useContext(UserContext) as {
        user: ResponseUserDto;
        setUser: (user: ResponseUserDto) => void;
    };
    // use search params hook to get the code
    const [searchParams] = useSearchParams();
    // navigate
    const navigate = useNavigate();

    // handle github callback
    const handleGithubCallback = async (code: string) => {
        const response: AxiosResponse<AuthResponseDto> =
            await apiClient.api.authControllerGithubAuth({
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
    };

    // this should be called only once
    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            handleGithubCallback(code);
        }
    }, [code]);

    return null;
};

export default GithubCallbackPage;
