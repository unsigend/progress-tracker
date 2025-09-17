/**
 * Key factory for the query keys
 * used for cache query key for Tanstack Query
 */

// import types
import type { QueryParamsType } from "@/api/api";

const keyFactory = {
    users: {
        me: () => ["users", "me"],
        detail: (id: string) => ["users", "detail", id],
    },
    auth: {
        emailCheck: (email: string) => ["auth", "emailCheck", email],
    },
    books: {
        all: (query: QueryParamsType = {}) => ["books", "all", query],
        detail: (id: string) => ["books", "detail", id],
    },
};

export default keyFactory;
