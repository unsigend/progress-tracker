// Consolidated OAuth callback handler for all providers

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

// Import hooks
import { useAuth } from "@/hooks/api";

// Import components
import LoadingBar from "@/components/ui/loadingBar";

interface OAuthCallbackHandlerProps {
    provider: "github" | "google";
}

/**
 * Handles OAuth callback flow for any provider
 * Consolidates the logic from the old component + page pattern
 */
const OAuthCallbackHandler = ({ provider }: OAuthCallbackHandlerProps) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { githubAuth, googleAuth, githubAuthState, googleAuthState } = useAuth();

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
            toast.error(`${provider} authentication failed: ${error}`);
            navigate("/auth/login");
            return;
        }

        if (!code) {
            toast.error("No authorization code received");
            navigate("/auth/login");
            return;
        }

        // Trigger the appropriate OAuth mutation
        if (provider === "github") {
            githubAuth({ code });
        } else if (provider === "google") {
            googleAuth({ code });
        }
    }, [searchParams, navigate, provider, githubAuth, googleAuth]);

    // Handle auth success/error
    useEffect(() => {
        const authState = provider === "github" ? githubAuthState : googleAuthState;

        if (authState.isError) {
            const errorMessage = authState.error?.message || "Authentication failed";
            toast.error(`${provider} authentication failed: ${errorMessage}`);
            navigate("/auth/login");
        }

        // Success will be handled by the auth hook automatically
        // which will redirect via the auth state changes
    }, [githubAuthState, googleAuthState, provider, navigate]);

    const isLoading = provider === "github" ?
        githubAuthState.isPending :
        googleAuthState.isPending;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <LoadingBar />
            <p className="mt-4 text-gray-600">
                Completing {provider} authentication...
            </p>
        </div>
    );
};

export default OAuthCallbackHandler;