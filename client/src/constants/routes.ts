/**
 * Routes Constants for the application
 */
const LANDING_ROOT = "";
const DASHBOARD_ROOT = `${LANDING_ROOT}/dashboard`;
const AUTH_ROOT = `${LANDING_ROOT}/auth`;
const READING_ROOT = `${DASHBOARD_ROOT}/reading`;
const BOOKS_ROOT = `${READING_ROOT}/books`;
const PROJECTS_ROOT = `${DASHBOARD_ROOT}/projects`;
const COURSES_ROOT = `${DASHBOARD_ROOT}/courses`;

/**
 * Constants Factory for the application
 */
const ROUTES_CONSTANTS = {
    LANDING() {
        return {
            HOME: (): string => `${LANDING_ROOT}/`,
            ABOUT: (): string => `${LANDING_ROOT}/about`,
        };
    },
    AUTH() {
        return {
            HOME: (): string => `${AUTH_ROOT}`,
            LOGIN: (): string => `${AUTH_ROOT}/login`,
            SIGNUP: (): string => `${AUTH_ROOT}/signup`,
            GOOGLE_CALLBACK: (): string => `${AUTH_ROOT}/google/callback`,
            GITHUB_CALLBACK: (): string => `${AUTH_ROOT}/github/callback`,
        };
    },
    DASHBOARD() {
        return {
            HOME: (): string => `${DASHBOARD_ROOT}`,
            READING: () => {
                return {
                    HOME: (): string => `${READING_ROOT}`,
                    RECORDINGS: (): string => `${READING_ROOT}/recordings`,
                    RECORDINGS_SHOW: (id?: string): string =>
                        id
                            ? `${READING_ROOT}/recordings/${id}`
                            : `${READING_ROOT}/recordings/:id`,
                    RECORDINGS_NEW: (): string =>
                        `${READING_ROOT}/recordings/new`,
                    BOOKS: (): string => `${BOOKS_ROOT}`,
                    BOOKS_LIST: (): string => `${BOOKS_ROOT}`,
                    BOOKS_SHOW: (id?: string): string =>
                        id ? `${BOOKS_ROOT}/${id}` : `${BOOKS_ROOT}/:id`,
                    BOOKS_EDIT: (id?: string): string =>
                        id
                            ? `${BOOKS_ROOT}/${id}/edit`
                            : `${BOOKS_ROOT}/:id/edit`,
                    BOOKS_NEW: (): string => `${BOOKS_ROOT}/new`,
                };
            },
            PROJECTS: () => {
                return {
                    HOME: (): string => `${PROJECTS_ROOT}`,
                };
            },
            COURSES: () => {
                return {
                    HOME: (): string => `${COURSES_ROOT}`,
                };
            },
            SETTINGS: (): string => `${DASHBOARD_ROOT}/settings`,
        };
    },
};

export default ROUTES_CONSTANTS;
