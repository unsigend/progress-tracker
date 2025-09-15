import globalConfig from "@/data/global";

/**
 * Handle github auth
 * @returns void
 */
const handleGithubAuth = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    // generate a random state for security
    const state = Math.random().toString(36).substring(7);

    if (!clientId) {
        console.error(
            "GitHub Client ID not found. Make sure VITE_GITHUB_CLIENT_ID is set in your .env file"
        );
        return;
    }

    const githubUrl = `${
        globalConfig.githubOAuthUrl
    }?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&state=${state}&scope=${encodeURIComponent(
        globalConfig.githubOAuthScope
    )}`;

    window.location.href = githubUrl;
};

/**
 * Handle google auth
 * @returns void
 */
const handleGoogleAuth = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        console.error(
            "Google Client ID or Redirect URI not found. Make sure\
             VITE_GOOGLE_CLIENT_ID and VITE_GOOGLE_REDIRECT_URI are \
             set in your .env file"
        );
        return;
    }

    const googleUrl = `${
        globalConfig.googleOAuthUrl
    }?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
        globalConfig.googleOAuthScope
    )}`;

    window.location.href = googleUrl;
};

export { handleGithubAuth, handleGoogleAuth };
