import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { theme } from "./styles/theme";

// MSAL imports
import {
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { ThemeProvider } from "@mui/material";

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}


  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    console.log("main event:", event ?? "");
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    event?.payload?.account
  ) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <App msalInstance={msalInstance} />
  </ThemeProvider>
);
