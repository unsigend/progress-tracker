// Combined books hook with all books CRUD operations

// import services
import {
    useBooks as useBooksQuery,
    useBook as useBookQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    usePatchBookMutation,
    useDeleteBookMutation,
} from "@/services/books";

// import types
import type { QueryParamsType, CreateBookDto, UpdateBookDto, PatchBookDto } from "@/api/api";

/**
 * Combined books hook with all CRUD operations
 */
const useBooks = () => {
    // Mutations
    const createBookMutation = useCreateBookMutation();
    const updateBookMutation = useUpdateBookMutation();
    const patchBookMutation = usePatchBookMutation();
    const deleteBookMutation = useDeleteBookMutation();

    return {
        // Query hooks (to be called in components)
        useBooks: useBooksQuery,
        useBook: useBookQuery,

        // CRUD actions
        createBook: (bookData: CreateBookDto) => createBookMutation.mutate(bookData),
        updateBook: (id: string, data: UpdateBookDto) => updateBookMutation.mutate({ id, data }),
        patchBook: (id: string, data: PatchBookDto) => patchBookMutation.mutate({ id, data }),
        deleteBook: (id: string) => deleteBookMutation.mutate(id),

        // Mutation states
        createState: {
            isPending: createBookMutation.isPending,
            isError: createBookMutation.isError,
            error: createBookMutation.error,
        },
        updateState: {
            isPending: updateBookMutation.isPending,
            isError: updateBookMutation.isError,
            error: updateBookMutation.error,
        },
        patchState: {
            isPending: patchBookMutation.isPending,
            isError: patchBookMutation.isError,
            error: patchBookMutation.error,
        },
        deleteState: {
            isPending: deleteBookMutation.isPending,
            isError: deleteBookMutation.isError,
            error: deleteBookMutation.error,
        },
    };
};

export default useBooks;