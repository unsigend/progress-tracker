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
            HOME: (): string => `${LANDING_ROOT}`,
            ABOUT: (): string => `${LANDING_ROOT}/about`,
        };
    },
    AUTH() {
        return {
            HOME: (): string => `${AUTH_ROOT}`,
            LOGIN: (): string => `${AUTH_ROOT}/login`,
            SIGNUP: (): string => `${AUTH_ROOT}/signup`,
        };
    },
    DASHBOARD() {
        return {
            HOME: (): string => `${DASHBOARD_ROOT}`,
            READING: () => {
                return {
                    HOME: (): string => `${READING_ROOT}`,
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
