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
import type { LoginRequestDto, LoginResponseDto } from "@/lib/api/api";

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

export { useLogin, useLogout };
