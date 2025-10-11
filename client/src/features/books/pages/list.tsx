// import dependencies
import { useSearchParams } from "react-router";
import { useMemo } from "react";

// import components
import BookLibrary from "@/features/books/components/BookLibrary";

// import hooks
import { useBooks } from "@/hooks/use-books";
import { useUpdateUrlParams } from "@/hooks/use-url-params";

// import types
import type { BooksResponseDto } from "@/lib/api/api";

const BookListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Extract query parameters from URL
    const query = useMemo(() => {
        const page = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;
        const limit = searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : 21;
        const sort = searchParams.get("sort") as
            | "createdAt"
            | "title"
            | "author"
            | "updatedAt"
            | undefined;
        const order = searchParams.get("order") as "asc" | "desc" | undefined;
        const value = searchParams.get("value") || undefined;

        return {
            page,
            limit,
            sort,
            order,
            value,
        };
    }, [searchParams]);

    // get books
    const { data, isLoading } = useBooks(query);

    // calculate total pages
    const totalPages = Math.ceil((data?.totalCount || 0) / query.limit);

    // update URL parameters
    const updateUrlParams = useUpdateUrlParams();

    // set current page
    const setCurrentPage = (page: number) => {
        const newParams = updateUrlParams(searchParams, { page });
        setSearchParams(newParams);
    };

    // search submit
    const setSearchValue = (term: string) => {
        const newParams = updateUrlParams(searchParams, {
            value: term,
            page: 1,
        });
        setSearchParams(newParams);
    };

    return (
        <BookLibrary
            books={data as BooksResponseDto}
            isLoading={isLoading}
            currentPage={query.page}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            searchSubmit={setSearchValue}
        />
    );
};

export default BookListPage;
