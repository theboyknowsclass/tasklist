import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

export const Auth = () => {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  useEffect(() => {
    instance
      .handleRedirectPromise()
      .then((tokenResponse) => {
        // Check if the tokenResponse is null
        // If the tokenResponse !== null, then you are coming back from a successful authentication redirect.
        // If the tokenResponse === null, you are not coming back from an auth redirect.
        console.log("TOKEN RESPONSE", tokenResponse);
      })
      .catch((error) => {
        // handle error, either in the library or coming back from the server
        console.log("ERROR", error);
      });
  }, [instance]);

  return <></>;
};
