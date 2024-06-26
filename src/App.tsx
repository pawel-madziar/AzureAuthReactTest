import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { AccountInfo, EventType, IPublicClientApplication } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

type AppProps = {
  msalInstance: IPublicClientApplication;
};

function App({ msalInstance }: AppProps) {
  const [account, setAccount] = useState<AccountInfo|null>(null);

  function handleLogin() {
    console.log("handleLogin");
    msalInstance.loginRedirect();
  }

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS &&
      event?.payload?.account
    ) {
      setAccount(event.payload.account);
    }
  });

  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <AuthenticatedTemplate>
        <div
          style={{ border: "1px solid aqua", margin: "7px", padding: "7px" }}
        >
          <h3>Authenticated</h3>
          <p>username: {account?.username}</p>
          <p>name: {account?.name}</p>
          <p>idToken:</p>
          <div style={{ overflow: "scroll" }}> {account?.idToken}</div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div
          style={{ border: "1px solid aqua", margin: "7px", padding: "7px" }}
        >
          <h3>Not authenticated</h3>
          <button onClick={handleLogin}>Click to Login</button>
        </div>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

export default App;
