// import dependencies
import { useEffect } from "react";
import { useSearchParams } from "react-router";

// import api
import apiClient from "@/api/apiClient";

// import types
import type { AuthResponseDto } from "@/api/api";
import type { AxiosResponse } from "axios";

const GithubCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const handleGithubCallback = async (code: string) => {
        console.log(code);
        const response: AxiosResponse<AuthResponseDto> =
            await apiClient.api.authControllerGithubAuth({
                code: code,
            });
        console.log(response);
    };

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            handleGithubCallback(code);
        }
    }, [searchParams]);

    return null;
};

export default GithubCallbackPage;
