// Combined auth hook with all auth-related operations

// import improved auth services that work with hooks
import {
    useAuthMe,
    useEmailCheck,
    useLoginMutation,
    useRegisterMutation,
    useGithubAuthMutation,
    useGoogleAuthMutation,
    useLogoutMutation,
} from "@/services/authWithHooks";

// import auth token hook
import { useAuthToken } from "@/hooks/useAuthToken";

// import types
import type { LoginDto, CreateUserDto, GithubAuthDto, GoogleAuthDto } from "@/api/api";

/**
 * Combined auth hook with all authentication operations
 * This replaces the old UserContext pattern
 */
const useAuth = () => {
    // Auth token management
    const { token, isAuthenticated: hasToken } = useAuthToken();

    // Queries
    const { data: user, isLoading, isError, error } = useAuthMe();

    // Mutations
    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();
    const githubAuthMutation = useGithubAuthMutation();
    const googleAuthMutation = useGoogleAuthMutation();
    const logoutMutation = useLogoutMutation();

    // Helper to check if user is authenticated
    // User is authenticated if they have both a token and valid user data
    const isAuthenticated = hasToken && !!user && !isError;

    // Helper to check if any auth operation is in progress
    const isAuthenticating = (
        loginMutation.isPending ||
        registerMutation.isPending ||
        githubAuthMutation.isPending ||
        googleAuthMutation.isPending
    );

    return {
        // User state
        user,
        token,
        isLoading,
        isError,
        error,
        isAuthenticated,
        isAuthenticating,

        // Auth actions
        login: (credentials: LoginDto) => loginMutation.mutate(credentials),
        register: (userData: CreateUserDto) => registerMutation.mutate(userData),
        githubAuth: (authData: GithubAuthDto) => githubAuthMutation.mutate(authData),
        googleAuth: (authData: GoogleAuthDto) => googleAuthMutation.mutate(authData),
        logout: () => logoutMutation.mutate(),

        // Mutation states
        loginState: {
            isPending: loginMutation.isPending,
            isError: loginMutation.isError,
            error: loginMutation.error,
        },
        registerState: {
            isPending: registerMutation.isPending,
            isError: registerMutation.isError,
            error: registerMutation.error,
        },
        githubAuthState: {
            isPending: githubAuthMutation.isPending,
            isError: githubAuthMutation.isError,
            error: githubAuthMutation.error,
        },
        googleAuthState: {
            isPending: googleAuthMutation.isPending,
            isError: googleAuthMutation.isError,
            error: googleAuthMutation.error,
        },
        logoutState: {
            isPending: logoutMutation.isPending,
            isError: logoutMutation.isError,
            error: logoutMutation.error,
        },
    };
};

// Also export the email check hook separately since it's conditional
export { useEmailCheck };

export default useAuth;