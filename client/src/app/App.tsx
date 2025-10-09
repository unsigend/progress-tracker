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

function App() {
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <AppRoutes />
                    <Toaster />
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
