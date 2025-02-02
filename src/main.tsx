import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#62AB00",
              colorText: "#110E17",
              fontSizeHeading1: 40,
              fontSizeHeading2: 36,
              fontSizeHeading5: 16,
              colorTextSecondary: "#545454",
              fontFamily: "Poppins",
              fontSize: 16,
            },
            components: {
              Typography: {
                // fontSize: 16,
              },
            },
          }}
        >
          <Router>
            <App />
          </Router>
          <Toaster richColors={true} expand={true} position={"top-right"} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
