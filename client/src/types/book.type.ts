interface BookType {
    id: string;
    title: string;
    author: string;
    description: string;
    pages: number;
    imageURL: string;
    ISBN: string;
    createdAt: Date;
    updatedAt: Date;
}

interface BookQueryType {
    search?: string;
    page?: number;
    limit?: number;
    sortedBy?: string;
    sortOrder?: string;
}

export type { BookType, BookQueryType };
