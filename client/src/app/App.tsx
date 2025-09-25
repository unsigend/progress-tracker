// import dependencies
import { Refine } from "@refinedev/core";
import { UnsavedChangesNotifier } from "@refinedev/react-router";
import { DocumentTitleHandler } from "@refinedev/react-router";
import { BrowserRouter } from "react-router";
// import components
import { Toaster } from "sonner";

// import providers
import routerProvider from "@refinedev/react-router";
import dataProvider from "@/providers/data.provider";
import authProvider from "@/providers/auth.provider";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";

// import routes
import AppRoutes from "@/app/routes";

// import constants
import RESOURCES_CONSTANTS from "@/constants/resources";
import ROUTES_CONSTANTS from "@/constants/routes";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="refine-ui-theme">
                <Refine
                    resources={[
                        {
                            name: RESOURCES_CONSTANTS.BOOKS,
                            list: `${ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .BOOKS_LIST()}`,
                            show: `${ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .BOOKS_SHOW()}`,
                            edit: `${ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .BOOKS_EDIT()}`,
                            create: `${ROUTES_CONSTANTS.DASHBOARD()
                                .READING()
                                .BOOKS_NEW()}`,
                        },
                    ]}
                    dataProvider={dataProvider}
                    notificationProvider={useNotificationProvider()}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    {/* App Routes */}
                    <AppRoutes />
                    {/* Toaster from sonner */}
                    <Toaster position="top-right" />
                    {/* Unsaved Changes Notifier */}
                    <UnsavedChangesNotifier />
                    {/* Document Title Handler */}
                    <DocumentTitleHandler />
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
