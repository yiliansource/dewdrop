import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { DewdropApp } from "./dewdrop-app.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <DewdropApp />
        </BrowserRouter>
    </StrictMode>,
);
