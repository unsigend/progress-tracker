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
import apiClient, { setAuthToken } from "@/api/apiClient";

// import types
import type { ResponseUserDto } from "@/api/api";
import type { AxiosResponse } from "axios";

// create query client instance
const queryClient = new QueryClient();

const App = () => {
    // actual state for user - this is what stores and updates the user data
    const [user, setUser] = useState<ResponseUserDto>({} as ResponseUserDto);

    useEffect(() => {
        const restoreUser = async () => {
            const jwtToken = localStorage.getItem("jwt-token");
            if (jwtToken) {
                try {
                    // Set auth token for the API client
                    setAuthToken(jwtToken);

                    // Get user data - apiClient returns AxiosResponse, so we need .data
                    const response: AxiosResponse<ResponseUserDto> =
                        await apiClient.api.authControllerMe();
                    setUser(response.data);
                } catch {
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
