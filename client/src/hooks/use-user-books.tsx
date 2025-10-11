// import dependencies
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import types
import type {
    ObjectIdDto,
    ReadingStatus,
    UserBookResponseDto,
    UserBooksResponseDto,
} from "@/lib/api/api";

// import api
import ApiClient from "@/lib/api/apiClient";
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

/**
 * Hook for the user books
 * @param query - Query parameters for filtering and pagination
 * @returns useQuery for the user books
 */
const useUserBooks = (query: { value?: ReadingStatus }) => {
    return useQuery({
        queryKey: API_KEY_FACTORY.USER_BOOK().All(query),
        queryFn: async (): Promise<UserBooksResponseDto> => {
            const response = await ApiClient.api.userBookControllerFindAll(
                query
            );
            return response.data as unknown as UserBooksResponseDto;
        },
    });
};

/**
 * Hook for the user book
 * @param id - The id of the user book
 * @returns useQuery for the user book
 */
const useUserBook = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY.USER_BOOK().Detail(id),
        queryFn: async (): Promise<UserBookResponseDto> => {
            const response = await ApiClient.api.userBookControllerFindById(id);
            return response.data as unknown as UserBookResponseDto;
        },
    });
};

/**
 * Hook for the create user book
 * @returns useMutation for the create user book
 */
const useCreateUserBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: ObjectIdDto): Promise<UserBookResponseDto> => {
            const response = await ApiClient.api.userBookControllerCreate(id);
            return response.data as unknown as UserBookResponseDto;
        },
        onSuccess: () => {
            // invalidate the user books query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER_BOOK().All(),
            });
        },
    });
};

/**
 * Hook for the delete user book
 * @param id - The id of the user book
 * @returns useMutation for the delete user book
 */
const useDeleteUserBook = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (): Promise<UserBookResponseDto> => {
            const response = await ApiClient.api.userBookControllerDeleteById(
                id
            );
            return response.data as unknown as UserBookResponseDto;
        },
        onSuccess: () => {
            // invalidate the user books query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.USER_BOOK().All(),
            });
        },
    });
};

/**
 * Hooks for the user books
 * @returns useUserBooks, useUserBook, useCreateUserBook, useDeleteUserBook
 */
export { useUserBooks, useUserBook, useCreateUserBook, useDeleteUserBook };
