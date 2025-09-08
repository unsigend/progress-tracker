// import routes
import AppRoutes from "@/app/routes";

// import query client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// create query client instance
const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
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
