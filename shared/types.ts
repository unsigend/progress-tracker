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

export type { BookType };
