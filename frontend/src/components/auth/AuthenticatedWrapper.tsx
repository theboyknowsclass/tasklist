import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { Loading } from "..";

interface Props {
  children: React.ReactNode;
}

export const AuthenticatedWrapper = ({ children }: Props) => {
  const authRequest = {
    scopes: ["openid", "profile"],
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      loadingComponent={Loading}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
};
