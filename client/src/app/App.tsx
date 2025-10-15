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

function App() {
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <Analytics />
                    <AppRoutes />
                    <Toaster position="top-right" />
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
