/**
 * API Query Key Factory for Tanstack Query
 */

const RESOURCES = {
    USERS: "users",
    BOOKS: "books",
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
            All: () => [RESOURCES.BOOKS],
            Detail: (id: string) => [RESOURCES.BOOKS, id],
        };
    },
    RECORDING: () => {
        return {
            All: () => [RESOURCES.RECORDINGS],
            Detail: (id: string) => [RESOURCES.RECORDINGS, id],
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
