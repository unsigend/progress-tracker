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
import { getErrorMessage } from "@/utils/auth";

// ============= QUERIES =============

/**
 * useUser hook to get a user by id
 * @param id - The id of the user
 * @returns data, isLoading, isError
 */
export const useUser = (id: string) => {
    return useQuery({
        queryKey: queryKeys.users.detail(id),
        queryFn: () => apiClient.api.userControllerGetById(id),
        select: (data) => data.data,
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// ============= MUTATIONS =============

/**
 * useUpdateUserMutation hook for updating a user
 * @returns mutate, isPending, isError, error
 */
export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
            apiClient.api.userControllerUpdate(id, data),
        onSuccess: (response, { id }) => {
            const updatedUser = response.data;

            // Update specific user in cache
            queryClient.setQueryData(queryKeys.users.detail(id), { data: updatedUser });

            // Also update auth.me if it's the same user
            const currentUser = queryClient.getQueryData(queryKeys.auth.me());
            if (currentUser && (currentUser as any).id === id) {
                queryClient.setQueryData(queryKeys.auth.me(), updatedUser);
            }
        },
        onError: (error) => {
            console.error("Update user failed:", getErrorMessage(error));
        },
    });
};

/**
 * useDeleteUserMutation hook for deleting a user
 * @returns mutate, isPending, isError, error
 */
export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            apiClient.api.userControllerDelete(id),
        onSuccess: (_, id) => {
            // Remove user from cache
            queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) });

            // If deleting current user, clear auth data
            const currentUser = queryClient.getQueryData(queryKeys.auth.me());
            if (currentUser && (currentUser as any).id === id) {
                queryClient.clear();
                localStorage.removeItem("jwt-token");
            }
        },
        onError: (error) => {
            console.error("Delete user failed:", getErrorMessage(error));
        },
    });
};