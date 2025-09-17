/**
 * Users service for the users related queries
 */
// import types
import type { UpdateUserDto } from "@/api/api";

// import api client
import apiClient from "@/api/apiClient";

// import key factory
import keyFactory from "@/services/key-factory";

// import react query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Current user query for getting the current user
 * @Route GET /api/v1/user/me
 * @returns the current user query
 */
export const useCurrentUserQuery = () => {
    return useQuery({
        queryKey: keyFactory.users.me(),
        queryFn: () => apiClient.api.userControllerGetCurrentUser(),
    });
};

/**
 * Update current user mutation for updating the current user
 * @Route PATCH /api/v1/user/me
 * @returns the update current user mutation, isPending, isSuccess, isError, error
 */
export const useUpdateCurrentUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateUserDto) =>
            apiClient.api.userControllerUpdateCurrentUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.users.me() });
        },
    });
};

/**
 * Replace current user mutation for updating the current user
 * @Route PUT /api/v1/user/me
 * @returns the replace current user mutation, isPending, isSuccess, isError, error
 */
export const useReplaceCurrentUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateUserDto) =>
            apiClient.api.userControllerReplaceCurrentUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.users.me() });
        },
    });
};

/**
 * Delete current user mutation for deleting the current user
 * @Route DELETE /api/v1/user/me
 * @returns the delete current user mutation, isPending, isSuccess, isError, error
 */
export const useDeleteCurrentUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => apiClient.api.userControllerDeleteCurrentUser(),
        onSuccess: () => {
            queryClient.clear();
        },
    });
};

/**
 * Get user by id query for getting a user by id
 * @Route GET /api/v1/user/{id}
 * @returns the get user by id query, isPending, isSuccess, isError, error
 */
export const useGetUserByIdQuery = (id: string) => {
    return useQuery({
        queryKey: keyFactory.users.detail(id),
        queryFn: () => apiClient.api.userControllerGetUserById(id),
    });
};

/**
 * Update user mutation for updating a user
 * @Route PATCH /api/v1/user/{id}
 * @returns the update user mutation, isPending, isSuccess, isError, error
 */
export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
            apiClient.api.userControllerUpdateUserById(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: keyFactory.users.detail(variables.id),
            });
        },
    });
};

/**
 * Replace user mutation for updating a user
 * @Route PUT /api/v1/user/{id}
 * @returns the replace user mutation, isPending, isSuccess, isError, error
 */
export const useReplaceUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
            apiClient.api.userControllerReplaceUserById(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: keyFactory.users.detail(variables.id),
            });
        },
    });
};

/**
 * Delete user mutation for deleting a user
 * @Route DELETE /api/v1/user/{id}
 * @returns the delete user mutation, isPending, isSuccess, isError, error
 */
export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id }: { id: string }) =>
            apiClient.api.userControllerDeleteUserById(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: keyFactory.users.detail(variables.id),
            });
        },
    });
};
