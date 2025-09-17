// import routes
import AppRoutes from "@/app/routes";

// import query client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// create query client instance with proper configuration
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: (failureCount, error: any) => {
                // Don't retry on 401/403 errors
                if (
                    error?.response?.status === 401 ||
                    error?.response?.status === 403
                ) {
                    return false;
                }
                // Retry up to 3 times for other errors
                return failureCount < 3;
            },
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* app routes */}
            <AppRoutes />
            {/* toast container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </QueryClientProvider>
    );
};

export default App;
