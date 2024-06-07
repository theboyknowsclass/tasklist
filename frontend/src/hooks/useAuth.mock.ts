import * as Hook from "./useAuth";
import { UseAuth } from "./useAuth";
import { InteractionStatus } from "@azure/msal-browser";

export const useAuthMock = (overrides = {}): UseAuth => {
  const mockHook = {
    isAuthenticated: false,
    userName: null,
    token: null,
    inProgress: InteractionStatus.Startup,
    logout: vi.fn(),
    ...overrides,
  } as UseAuth;

  vi.spyOn(Hook, "useAuth").mockReturnValue(mockHook);

  return mockHook;
};
