/**
 * API Query Key Factory for Tanstack Query
 */

// import types
import type { ReadingStatus } from "@/lib/api/api";

const RESOURCES = {
    USERS_KEY: "users",
    BOOKS_KEY: "books",
    USER_BOOKS_KEY: "user-books",
    RECORDINGS_KEY: "recordings",
    PROJECTS_KEY: "projects",
    COURSES_KEY: "courses",
    STATISTICS_KEY: "statistics",
};

const API_KEY_FACTORY = {
    USER: () => {
        return {
            All: () => [RESOURCES.USERS_KEY],
            Detail: (id: string) => [RESOURCES.USERS_KEY, id],
            Me: () => [RESOURCES.USERS_KEY, "me"],
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
                if (!query) return [RESOURCES.BOOKS_KEY];
                return [RESOURCES.BOOKS_KEY, query];
            },
            Detail: (id: string) => [RESOURCES.BOOKS_KEY, id],
        };
    },
    RECORDING: () => {
        return {
            Detail: (id: string) => [RESOURCES.RECORDINGS_KEY, id],
        };
    },
    USER_BOOK: () => {
        return {
            All: (query?: { value?: ReadingStatus }) => {
                if (!query) return [RESOURCES.USER_BOOKS_KEY];
                return [RESOURCES.USER_BOOKS_KEY, query];
            },
            Detail: (id: string) => [RESOURCES.USER_BOOKS_KEY, id],
        };
    },
    PROJECT: () => {
        return {
            All: () => [RESOURCES.PROJECTS_KEY],
            Detail: (id: string) => [RESOURCES.PROJECTS_KEY, id],
        };
    },
    COURSE: () => {
        return {
            All: () => [RESOURCES.COURSES_KEY],
            Detail: (id: string) => [RESOURCES.COURSES_KEY, id],
        };
    },
    STATISTICS: () => {
        return {
            Recordings: (query?: {
                startDate?: string;
                dateLimit?: number;
            }) => [RESOURCES.STATISTICS_KEY, RESOURCES.RECORDINGS_KEY, query],
        };
    },
};

export default API_KEY_FACTORY;
