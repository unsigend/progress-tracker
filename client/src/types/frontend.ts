import type { BookType } from "@root/shared/types";

// Frontend-specific extension of BookType that includes MongoDB _id
export interface BookWithId extends BookType {
    _id: string;
    __v?: number;
}
