// import dependencies
import { useOAuthCallback } from "@/hooks/useOAuthCallback";

// import components
import LoadingBar from "@/components/ui/loadingBar";

/**
 * OAuthCallback component
 * @param provider - The provider to authenticate with
 * @returns The OAuthCallback component
 */
interface OAuthCallbackProps {
    provider: "github" | "google";
}

/**
 * OAuthCallback component
 * @param provider - The provider to authenticate with
 * @returns The OAuthCallback component
 */
const OAuthCallback = ({ provider }: OAuthCallbackProps) => {
    // get loading state
    const { loading } = useOAuthCallback(provider);

    if (loading) {
        const providerName = provider === "github" ? "GitHub" : "Google";
        return (
            <LoadingBar message={`Authenticating with ${providerName}...`} />
        );
    }

    return null;
};

export default OAuthCallback;
