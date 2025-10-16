// import dependencies
import { BrowserRouter } from "react-router";

// import components
import AppRoutes from "@/app/routes";

// import theme provider
import { ThemeProvider } from "@/hooks/use-theme";

// import QueryClient
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import toast
import { Toaster } from "@/components/ui/sonner";

// import vercel analytics
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    {/* Analytics and Speed Insights */}
                    <Analytics />
                    <SpeedInsights />

                    {/* App Routes */}
                    <AppRoutes />

                    {/* Toast */}
                    <Toaster position="top-right" />
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
