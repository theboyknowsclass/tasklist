import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

export interface UseAuth {
  isAuthenticated: boolean;
  userName: string | null;
  token: string | null;
  inProgress: InteractionStatus;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuth => {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const userName = accounts.length > 0 ? accounts[0].name ?? null : null;
  const token = accounts.length > 0 ? accounts[0].idToken ?? null : null;

  const logout = async () => {
    await instance.logout();
  };

  return { isAuthenticated, userName, token, inProgress, logout };
};
