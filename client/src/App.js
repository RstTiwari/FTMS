import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "pages/PageLoader";
import { AuthProvider } from "./state/AuthProvider";
import { CookiesProvider } from "react-cookie";
function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const Myfac8ry = lazy(() => import("./router/Myfac8ry"));

    return (
        <div className="app">
            <BrowserRouter>
                <Suspense
                    fallback={
                        <PageLoader
                            text={
                                "Please Wait While We make Everythinh Perfect For You"
                            }
                            isLoading={false}
                        />
                    }
                >
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <CookiesProvider  defaultSetOptions={{ path: "/" }} >
                            <AuthProvider>
                                    <Myfac8ry />
                            </AuthProvider>
                        </CookiesProvider>
                    </ThemeProvider>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
