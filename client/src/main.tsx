import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import styles
import "@/index.css";

// import router
import { BrowserRouter } from "react-router";

// import App
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
