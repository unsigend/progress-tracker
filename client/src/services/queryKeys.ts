// Centralized query key factory
export const queryKeys = {
  auth: {
    me: () => ['auth', 'me'] as const,
    emailCheck: (email: string) => ['auth', 'email-check', email] as const,
  },
  books: {
    all: (params?: object) => ['books', 'list', params] as const,
    detail: (id: string) => ['books', 'detail', id] as const,
  },
  users: {
    detail: (id: string) => ['users', 'detail', id] as const,
  },
} as const;