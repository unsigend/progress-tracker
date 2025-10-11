// import dependencies
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

// import api
import ApiClient from "@/lib/api/apiClient";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

// import toast
import { toast } from "sonner";

// import utils
import errorUtils from "@/lib/utils/error";

// import types
import type { UserResponseDto, UserUpdateDto } from "@/lib/api/api";

// import constants
import ROUTES_CONSTANTS from "@/lib/constants/routes";
import AUTH_CONSTANTS from "@/lib/constants/auth";

/**
 * Hook for the current user
 * @returns useQuery for the current user
 */
const useMe = () => {
    return useQuery({
        queryKey: API_KEY_FACTORY.USER().Me(),
        queryFn: async (): Promise<UserResponseDto> => {
            const response = await ApiClient.api.userControllerGetMe();
            return response.data as unknown as UserResponseDto;
        },
    });
};

const useUpdateMe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UserUpdateDto): Promise<UserResponseDto> => {
            const response = await ApiClient.api.userControllerUpdateMe(data);
            return response.data as unknown as UserResponseDto;
        },
        onSuccess: () => {
            // invalidate the user query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER().Me(),
            });
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};

const useDeleteMe = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (): Promise<UserResponseDto> => {
            const response = await ApiClient.api.userControllerDeleteMe();
            return response.data as unknown as UserResponseDto;
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

export { useMe, useUpdateMe, useDeleteMe };
