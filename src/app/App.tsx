import { Routes } from "react-router-dom";
import { history, CustomRouter } from "utils";
import { getRoutes } from "routing";
// import { ThemeProvider } from "styled-components";
import { StoreProvider } from "easy-peasy";
import { store } from "state";
import { AppLayout } from "layout";

// default styles from ant design library

import "antd/dist/reset.css";
// import "./solbay-custom.css";

import "./App.css";

// easy peasy having an issue with react v18's type script here is a workaround as to solve the issue
const StoreProviderOverride = StoreProvider as any;

function App() {
    const routes = getRoutes();

    return (
        // <ThemeProvider >
        <StoreProviderOverride store={store}>
            <CustomRouter history={history}>
                <AppLayout>
                    <Routes>{routes}</Routes>
                </AppLayout>
            </CustomRouter>
        </StoreProviderOverride>
        // </ThemeProvider>
    );
}
export default App;
