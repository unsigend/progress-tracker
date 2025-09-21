import { Refine } from "@refinedev/core";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes } from "react-router";
import "./App.css";

import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev"
                    )}
                    notificationProvider={useNotificationProvider()}
                    routerProvider={routerProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>{/* Add your actual routes here */}</Routes>
                    <Toaster />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
