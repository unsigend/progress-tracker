// import dependencies
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

// import api
import ApiClient from "@/lib/api/apiClient";

// import toast
import { toast } from "sonner";

// import constants
import AUTH_CONSTANTS from "@/lib/constants/auth";
import ROUTES_CONSTANTS from "@/lib/constants/routes";

// import types
import type {
    LoginRequestDto,
    LoginResponseDto,
    RegisterUserDto,
} from "@/lib/api/api";

// import utils
import errorUtils from "@/lib/utils/error";

/**
 * Hook for the login
 * @returns useMutation for the login
 */
const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: LoginRequestDto
        ): Promise<LoginResponseDto> => {
            const response = await ApiClient.api.authControllerLogin(data);
            return response.data as unknown as LoginResponseDto;
        },
        retry: 0,
        onSuccess: (data: LoginResponseDto) => {
            localStorage.setItem(
                AUTH_CONSTANTS.ACCESS_TOKEN_KEY,
                data.access_token
            );
            // invalidate the user query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER().Me(),
            });
            // navigate to dashboard
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};

/**
 * Hook for the register
 * @returns useMutation for the register
 */
const useRegister = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            data: RegisterUserDto
        ): Promise<LoginResponseDto> => {
            const response = await ApiClient.api.authControllerRegister(data);
            return response.data as unknown as LoginResponseDto;
        },
        retry: 0,
        onSuccess: (data: LoginResponseDto) => {
            // set the access token to local storage
            localStorage.setItem(
                AUTH_CONSTANTS.ACCESS_TOKEN_KEY,
                data.access_token
            );
            // invalidate the user query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER().Me(),
            });
            // navigate to dashboard
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};

/**
 * Hook for the logout
 * @returns useMutation for the logout
 */
const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            await ApiClient.api.authControllerLogout();
        },
        onSuccess: () => {
            // invalidate the user query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER().Me(),
            });
            // remove the access token from localStorage
            localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
            // navigate to login
            navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};

/**
 * Hook for the google login
 * @returns useMutation for the google login
 */
const useGoogleLogin = () => {
    return () => {
        window.location.href = `${
            import.meta.env.VITE_BACKEND_API_URL
        }/api/v1/auth/google`;
    };
};

/**
 * Hook for the github login
 * @returns useMutation for the github login
 */
const useGithubLogin = () => {
    return () => {
        window.location.href = `${
            import.meta.env.VITE_BACKEND_API_URL
        }/api/v1/auth/github`;
    };
};

/**
 * Hook for the email check
 * @returns boolean for whether the email exists
 */
const useEmailCheck = () => {
    return useMutation({
        mutationFn: async (email: string): Promise<boolean> => {
            const response = await ApiClient.api.authControllerEmailCheck(
                email
            );
            return response.data.exists;
        },
        retry: 0,
    });
};

export {
    useLogin,
    useLogout,
    useGoogleLogin,
    useGithubLogin,
    useEmailCheck,
    useRegister,
};
