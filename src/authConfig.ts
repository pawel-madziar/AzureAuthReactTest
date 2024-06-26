
import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "7c7e03a7-ae54-48ab-8a76-dab6083bc3db",
        authority: "https://login.microsoftonline.com/8e92366d-9052-419c-80d8-f448387d34ee",
        redirectUri: "/",
        postLogoutRedirectUri: "/",
    },
    system: {
        allowNativeBroker: false // Disables WAM Broker
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: true // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};