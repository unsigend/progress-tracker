// import dependencies
import { Refine } from "@refinedev/core";
import {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter } from "react-router";

// import components
import { Toaster } from "@/components/refine-ui/notification/toaster";

// import providers
import routerProvider from "@refinedev/react-router";
import dataProvider from "@/providers/data.provider";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";

// import routes
import AppRoutes from "@/app/routes";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="refine-ui-theme">
                <Refine
                    dataProvider={dataProvider}
                    notificationProvider={useNotificationProvider()}
                    routerProvider={routerProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    {/* App Routes */}
                    <AppRoutes />
                    {/* Toaster */}
                    <Toaster />
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
