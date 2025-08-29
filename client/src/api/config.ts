const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const API = {
    books: `${BASE_URL}/api/books`,
    users: `${BASE_URL}/api/users`,
};
