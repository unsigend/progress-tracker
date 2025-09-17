// Users-related services - queries and mutations

// import dependencies
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import api
import apiClient from "@/api/apiClient";

// import query keys
import { queryKeys } from "@/services/queryKeys";

// import types
import type { UpdateUserDto } from "@/api/api";

// import utils
import errorUtils from "@/utils/error";
import { useAuthToken } from "@/hooks/useAuthToken";

/**
 * useUser hook to get a user by id
 * @param id - The id of the user
 * @returns data, isLoading, isError
 */
export const useUser = (id: string) => {
    return useQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: () => apiClient.api.userControllerGetById(id),
        select: (data) => data.data,
        enabled: !!id,
    });
};

/**
 * useUpdateUserMutation hook for updating a user
 * @returns mutate, isPending, isError, error
 */
export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
            apiClient.api.userControllerUpdate(id, data),
        onSuccess: (response) => {
            const updatedUser = response.data;

            // update cache
            queryClient.setQueryData(queryKeys.auth.me(), updatedUser);
        },
        onError: (error) => {
            console.error(
                "Update user failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useDeleteUserMutation hook for deleting a user
 * @returns mutate, isPending, isError, error
 */
export const useDeleteUserMutation = () => {
    const { removeToken } = useAuthToken();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.api.userControllerDelete(id),
        onSuccess: () => {
            // remove token both from localStorage and API client
            removeToken();

            // clear auth data
            queryClient.clear();
        },
        onError: (error) => {
            console.error(
                "Delete user failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};
