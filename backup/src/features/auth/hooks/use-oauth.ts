/**
 * Hook to handle OAuth login
 * @returns {
 *  login: (provider: string) => void,
 * }
 */
const useOAuthLogin = () => {
    const login = async (provider: string) => {
        window.location.href = `${
            import.meta.env.VITE_BACKEND_API_URL
        }/api/v1/auth/${provider}`;
    };

    return { login };
};

export { useOAuthLogin };
