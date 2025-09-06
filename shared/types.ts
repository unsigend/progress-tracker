interface BookType {
    id: string;
    title?: string;
    author?: string;
    description?: string;
    pages?: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    ISBN?: string;
}

interface BookQueryType {
    sortedBy?: "title" | "createdAt";
    order?: "asc" | "desc";
    search?: string;
    searchBy?: "title" | "author" | "ISBN";
    limit?: number;
    page?: number;
}

export type { BookType, BookQueryType };
