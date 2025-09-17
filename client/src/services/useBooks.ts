/**
 * Books service for the books related queries
 */

// import types
import type { CreateBookDto, UpdateBookDto, QueryParamsType } from "@/api/api";

// import api client
import apiClient from "@/api/apiClient";

// import key factory
import keyFactory from "@/services/key-factory";

// import react query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Get all books query for getting all books
 * @returns the get all books query, isPending, isSuccess, isError, error
 * @Route GET /api/v1/books
 */
export const useGetAllBooksQuery = (query: QueryParamsType) => {
    return useQuery({
        queryKey: keyFactory.books.all(query),
        queryFn: () => apiClient.api.booksControllerGetAllBooks(query),
    });
};

/**
 * Create book mutation for creating a book
 * @returns the create book mutation, isPending, isSuccess, isError, error
 * @Route POST /api/v1/books
 */
export const useCreateBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBookDto) =>
            apiClient.api.booksControllerCreateBook(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keyFactory.books.all() });
        },
    });
};

/**
 * Get book by id query for getting a book by id
 * @returns the get book by id query, isPending, isSuccess, isError, error
 * @Route GET /api/v1/books/{id}
 */
export const useGetBookByIdQuery = (id: string) => {
    return useQuery({
        queryKey: keyFactory.books.detail(id),
        queryFn: () => apiClient.api.booksControllerGetBookById(id),
    });
};

/**
 * Replace book mutation for replacing a book
 * @returns the replace book mutation, isPending, isSuccess, isError, error
 * @Route PUT /api/v1/books/{id}
 */
export const useReplaceBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBookDto }) =>
            apiClient.api.booksControllerReplaceBookById(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: keyFactory.books.detail(variables.id),
            });
        },
    });
};

/**
 * Update book mutation for updating a book
 * @returns the update book mutation, isPending, isSuccess, isError, error
 * @Route PATCH /api/v1/books/{id}
 */
export const useUpdateBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBookDto }) =>
            apiClient.api.booksControllerUpdateBookById(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: keyFactory.books.detail(variables.id),
            });
        },
    });
};

/**
 * Delete book mutation for deleting a book
 * @returns the delete book mutation, isPending, isSuccess, isError, error
 * @Route DELETE /api/v1/books/{id}
 */
export const useDeleteBookMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id }: { id: string }) =>
            apiClient.api.booksControllerDeleteBookById(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: keyFactory.books.detail(variables.id),
            });
        },
    });
};
