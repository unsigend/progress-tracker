// import dependencies
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import api
import ApiClient from "@/lib/api/apiClient";

// import types
import type {
    BooksResponseDto,
    BookResponseDto,
    BookCreateDto,
    BookUpdateDto,
} from "@/lib/api/api";

// import api key factory
import API_KEY_FACTORY from "@/lib/api/apiKeyFactory";

// import toast
import { toast } from "sonner";

// import utils
import errorUtils from "@/lib/utils/error";

/**
 * Hook for the books
 * @param query - Query parameters for filtering and pagination
 * @returns useQuery for the books
 */
const useBooks = (
    query: {
        value?: string;
        page?: number;
        limit?: number;
        sort?: "title" | "author" | "createdAt" | "updatedAt";
        order?: "asc" | "desc";
    } = {}
) => {
    return useQuery({
        queryKey: API_KEY_FACTORY.BOOK().All(query),
        queryFn: async (): Promise<BooksResponseDto> => {
            const response = await ApiClient.api.bookControllerFindAll(query);
            return response.data as unknown as BooksResponseDto;
        },
    });
};

/**
 * Hook for the book
 * @param id - The id of the book
 * @returns useQuery for the book
 */
const useBook = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY.BOOK().Detail(id),
        enabled: !!id,
        queryFn: async (): Promise<BookResponseDto> => {
            const response = await ApiClient.api.bookControllerFindById(id);
            return response.data as unknown as BookResponseDto;
        },
    });
};

/**
 * Hook for the create book
 * @returns useMutation for the create book
 */
const useCreateBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: BookCreateDto): Promise<BookResponseDto> => {
            const formData = new FormData();
            // append required fields
            formData.append("title", data.title);
            formData.append("pages", data.pages.toString());

            // append optional fields
            if (data.description) {
                formData.append("description", data.description);
            }
            if (data.author) {
                formData.append("author", data.author);
            }
            if (data.ISBN10) {
                formData.append("ISBN10", data.ISBN10);
            }
            if (data.ISBN13) {
                formData.append("ISBN13", data.ISBN13);
            }
            if (data.cover_url) {
                formData.append("cover_url", data.cover_url);
            }
            if (data.cover) {
                formData.append("cover", data.cover);
            }
            const response = await ApiClient.api.bookControllerCreate(
                formData as unknown as BookCreateDto
            );
            return response.data as unknown as BookResponseDto;
        },
        onSuccess: () => {
            // invalidate the books query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.BOOK().All(),
            });
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};

/**
 * Hook for the update book
 * @param id - The id of the book
 * @returns useMutation for the update book
 */
const useUpdateBook = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: BookUpdateDto): Promise<BookResponseDto> => {
            const formData = new FormData();

            // append optional fields
            if (data.title) {
                formData.append("title", data.title);
            }
            if (data.author) {
                formData.append("author", data.author);
            }
            if (data.description) {
                formData.append("description", data.description);
            }
            if (data.ISBN10) {
                formData.append("ISBN10", data.ISBN10);
            }
            if (data.ISBN13) {
                formData.append("ISBN13", data.ISBN13);
            }
            if (data.pages) {
                formData.append("pages", data.pages.toString());
            }
            if (data.cover_url) {
                formData.append("cover_url", data.cover_url);
            }
            if (data.cover) {
                formData.append("cover", data.cover);
            }
            const response = await ApiClient.api.bookControllerPatch(
                id,
                formData as unknown as BookUpdateDto
            );
            return response.data as unknown as BookResponseDto;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.BOOK().All(),
            });

            // invalidate the books query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.BOOK().Detail(id),
            });
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};

/**
 * Hook for the delete book
 * @param id - The id of the book
 * @returns useMutation for the delete book
 */
const useDeleteBook = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (): Promise<BookResponseDto> => {
            const response = await ApiClient.api.bookControllerDeleteById(id);
            return response.data as unknown as BookResponseDto;
        },
        onSuccess: () => {
            // invalidate the books query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY.BOOK().All(),
            });
        },
        onError: (error) => {
            toast.error(errorUtils.extractErrorMessage(error));
        },
    });
};
export { useBooks, useBook, useCreateBook, useUpdateBook, useDeleteBook };
