import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { CircularProgress, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const LoadingComponent = () => {
  return (
    <div>
      <CircularProgress />
      <Typography variant="body1">Loading...</Typography>
    </div>
  );
};

export const AuthenticatedWrapper = ({ children }: Props) => {
  const authRequest = {
    scopes: ["openid", "profile"],
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      loadingComponent={LoadingComponent}
    >
      {children}
    </MsalAuthenticationTemplate>
  );
};
