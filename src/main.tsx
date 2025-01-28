import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // globally
          // colorPrimaryBg: "#FAF4F1",
          colorPrimary: "#62AB00",
          colorText: "#110E17",
          fontSizeHeading1: 40,
          fontSizeHeading2: 36,
          fontSizeHeading5: 16,
          colorTextSecondary: "#545454",
          fontFamily: "Poppins",
          fontSize: 16,
        },
        // component wise
        components: {
          Typography: {
            // fontSize: 16,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
