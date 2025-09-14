// import routes
import AppRoutes from "@/app/routes";

// import dependencies
import { useState, useEffect } from "react";

// import query client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import context
import UserContext from "@/context/userContext";

// import api
import authAPI from "@/api/auth.api";

// import types
import type { UserType } from "@/types/user.type";

// create query client instance
const queryClient = new QueryClient();

const App = () => {
    // actual state for user - this is what stores and updates the user data
    const [user, setUser] = useState<UserType>({} as UserType);

    // restore user data on page load if JWT exists
    useEffect(() => {
        const restoreUser = async () => {
            const jwtToken = localStorage.getItem("jwt-token");
            if (jwtToken) {
                try {
                    const userData = await authAPI.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    // JWT might be expired or invalid, remove it
                    localStorage.removeItem("jwt-token");
                }
            }
        };

        restoreUser();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={{ user, setUser }}>
                {/* app routes */}
                <AppRoutes />
            </UserContext.Provider>
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
