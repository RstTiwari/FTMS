import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "pages/PageLoader";
import { AuthProvider } from "./state/AuthProvider";

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const Myfac8ry = lazy(() => import("./router/Myfac8ry"));

    return (
        <div className="app">
            <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AuthProvider>
                            <Myfac8ry />
                        </AuthProvider>
                    </ThemeProvider>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
