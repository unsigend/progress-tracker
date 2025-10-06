// import shadcn/ui components
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "@/components/ui/pagination";

/**
 * SmartPagination component
 * @param currentPage - The current page
 * @param totalPages - The total number of pages
 * @param setCurrentPage - The function to set the current page
 * @returns The SmartPagination component
 */
const SmartPagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
}: {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}) => {
    // handle previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // handle next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Generate smart page numbers
    const generatePageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Show all pages if total pages <= 7
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Smart pagination logic
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            // Always show first page
            pages.push(1);

            // Add ellipsis if there's a gap after page 1
            if (startPage > 2) {
                pages.push("ellipsis-start");
            }

            // Add pages around current page
            for (let i = startPage; i <= endPage; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            // Add ellipsis if there's a gap before last page
            if (endPage < totalPages - 1) {
                pages.push("ellipsis-end");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Page */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePreviousPage}
                        className="cursor-pointer"
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => setCurrentPage(page as number)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next Page */}
                <PaginationItem>
                    <PaginationNext
                        onClick={handleNextPage}
                        className="cursor-pointer"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default SmartPagination;
