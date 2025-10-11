/**
 * API Query Key Factory for Tanstack Query
 */

// import types
import type { ReadingStatus } from "@/lib/api/api";

const RESOURCES = {
    USERS: "users",
    BOOKS: "books",
    USER_BOOKS: "user-books",
    RECORDINGS: "recordings",
    PROJECTS: "projects",
    COURSES: "courses",
};

const API_KEY_FACTORY = {
    USER: () => {
        return {
            All: () => [RESOURCES.USERS],
            Detail: (id: string) => [RESOURCES.USERS, id],
            Me: () => [RESOURCES.USERS, "me"],
        };
    },
    BOOK: () => {
        return {
            All: (query?: {
                value?: string;
                page?: number;
                limit?: number;
                sort?: "title" | "author" | "createdAt" | "updatedAt";
                order?: "asc" | "desc";
            }) => {
                if (!query) return [RESOURCES.BOOKS];
                return [RESOURCES.BOOKS, query];
            },
            Detail: (id: string) => [RESOURCES.BOOKS, id],
        };
    },
    RECORDING: () => {
        return {
            Detail: (id: string) => [RESOURCES.RECORDINGS, id],
        };
    },
    USER_BOOK: () => {
        return {
            All: (query?: { value?: ReadingStatus }) => {
                if (!query) return [RESOURCES.USER_BOOKS];
                return [RESOURCES.USER_BOOKS, query];
            },
            Detail: (id: string) => [RESOURCES.USER_BOOKS, id],
        };
    },
    PROJECT: () => {
        return {
            All: () => [RESOURCES.PROJECTS],
            Detail: (id: string) => [RESOURCES.PROJECTS, id],
        };
    },
    COURSE: () => {
        return {
            All: () => [RESOURCES.COURSES],
            Detail: (id: string) => [RESOURCES.COURSES, id],
        };
    },
};

export default API_KEY_FACTORY;
