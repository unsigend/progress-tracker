// import dependencies
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

// import styles
import "@/app/index.css";

// import app
import App from "@/app/App";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
