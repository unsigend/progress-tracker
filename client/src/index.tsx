import React from "react";
import { createRoot } from "react-dom/client";

// import app
import App from "@/app/App";

// import styles
import "@/app/App.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(<App />);
