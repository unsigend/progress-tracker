/**
 * Query factory: keys for the API
 * this is a internal cache keys for the API
 * @returns query keys
 */
export const queryKeys = {
    auth: {
        me: () => ["auth", "me"] as const,
        emailCheck: (email: string) => ["auth", "email-check", email] as const,
    },
    books: {
        all: (params?: object) => ["books", "list", params] as const,
        detail: (id: string) => ["books", "detail", id] as const,
    },
} as const;
