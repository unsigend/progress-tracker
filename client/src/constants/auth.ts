export const AUTH_STORAGE_KEY = "jwt-token";

export const AUTH_ROUTES = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    DASHBOARD: "/dashboard",
    HOME: "/",
} as const;

export const ERROR_MESSAGES = {
    INVALID_EMAIL: "Please enter a valid email address",
    EMAIL_EXISTS: "Email already in use",
    PASSWORD_REQUIRED: "Password must be at least 8 characters long",
    USERNAME_REQUIRED: "Username must be between 3 and 20 characters long",
} as const;
