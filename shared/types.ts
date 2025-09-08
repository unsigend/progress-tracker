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
    limit?: number;
    page?: number;
}

interface UserType {
    id?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type { BookType, BookQueryType, UserType };
