import { useCallback } from "react";
import { InteractionType, PopupRequest } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

export const useFetchWithMsal = (msalRequest: PopupRequest) => {
  const { instance } = useMsal();

  const {
    result,
    error: msalError,
    acquireToken,
  } = useMsalAuthentication(InteractionType.Popup, {
    ...msalRequest,
    account: instance.getActiveAccount() ?? undefined,
    redirectUri: "/redirect",
  });

  const executeFetch = async <TData, TReturn>(
    method: string,
    endpoint: string,
    data?: TData | null
  ) => {
    if (msalError) {
      throw Error("Authentication failed");
    }

    let token = result?.accessToken;

    if (!result?.accessToken) {
      const tokenResponse = await acquireToken(
        InteractionType.Popup,
        msalRequest
      );

      if (tokenResponse?.accessToken) {
        token = tokenResponse.accessToken;
      }
    }

    if (!token) {
      throw Error("No Token");
    }

    try {
      const headers = new Headers();
      const bearer = `Bearer ${token}`;
      headers.append("Authorization", bearer);

      if (data) {
        headers.append("Content-Type", "application/json");
      }

      const options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();
      console.log("response: ", result);
      return result as TReturn;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return {
    executeFetch: useCallback(executeFetch, [
      msalError,
      result,
      acquireToken,
      msalRequest,
    ]),
  };
};
