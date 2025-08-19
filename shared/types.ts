interface BookType {
    title: string;
    author: string;
    description: string;
    pages: number;
    image: string;
    ISBN: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserType {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { BookType, UserType };
