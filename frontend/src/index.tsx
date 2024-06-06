import ReactDOM from "react-dom/client";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { msalConfig } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";
import { Auth } from "./components/Auth";

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <Auth />
        <App />
      </MsalProvider>
    </BrowserRouter>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
