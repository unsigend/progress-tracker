// Books-related services - queries and mutations

// import dependencies
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import api
import apiClient from "@/api/apiClient";

// import query keys
import { queryKeys } from "@/services/queryKeys";

// import types
import type {
    QueryParamsType,
    CreateBookDto,
    UpdateBookDto,
    PatchBookDto,
} from "@/api/api";

// import utils
import errorUtils from "@/utils/error";

/**
 * useBooks hook to get all books
 * @param params - The query parameters
 * @returns data, isLoading, isError
 */
export const useBooks = (params?: QueryParamsType) => {
    return useQuery({
        queryKey: queryKeys.books.all(params),
        queryFn: () => apiClient.api.booksControllerFindAll(params),
        select: (data) => data.data,
    });
};

/**
 * useBook hook to get a book by id
 * @param id - The id of the book
 * @returns data, isLoading, isError
 */
export const useBook = (id: string) => {
    return useQuery({
        queryKey: queryKeys.books.detail(id),
        queryFn: () => apiClient.api.booksControllerFindOne(id),
        select: (data) => data.data,
        enabled: !!id,
    });
};

/**
 * useCreateBookMutation hook for creating a new book
 * @returns mutate, isPending, isError, error
 */
export const useCreateBookMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookData: CreateBookDto) =>
            apiClient.api.booksControllerCreate(bookData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.books.all() });
        },
        onError: (error) => {
            console.error(
                "Create book failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useUpdateBookMutation hook for updating a book
 * @returns mutate, isPending, isError, error
 */
export const useUpdateBookMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBookDto }) =>
            apiClient.api.booksControllerUpdate(id, data),
        onSuccess: (response, { id }) => {
            const updatedBook = response.data;

            // Update specific book in cache
            queryClient.setQueryData(queryKeys.books.detail(id), {
                data: updatedBook,
            });

            // Invalidate books list to refetch
            queryClient.invalidateQueries({ queryKey: queryKeys.books.all() });
        },
        onError: (error) => {
            console.error(
                "Update book failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * usePatchBookMutation hook for patching a book
 * @returns mutate, isPending, isError, error
 */
export const usePatchBookMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: PatchBookDto }) =>
            apiClient.api.booksControllerPatch(id, data),
        onSuccess: (response, { id }) => {
            const updatedBook = response.data;

            // Update specific book in cache
            queryClient.setQueryData(queryKeys.books.detail(id), {
                data: updatedBook,
            });

            // Invalidate books list to refetch
            queryClient.invalidateQueries({ queryKey: queryKeys.books.all() });
        },
        onError: (error) => {
            console.error(
                "Patch book failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};

/**
 * useDeleteBookMutation hook for deleting a book
 * @returns mutate, isPending, isError, error
 */
export const useDeleteBookMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.api.booksControllerDelete(id),
        onSuccess: (_, id) => {
            // Remove book from cache
            queryClient.removeQueries({ queryKey: queryKeys.books.detail(id) });

            // Invalidate books list to refetch
            queryClient.invalidateQueries({ queryKey: queryKeys.books.all() });
        },
        onError: (error) => {
            console.error(
                "Delete book failed:",
                errorUtils.extractErrorMessage(error)
            );
        },
    });
};
