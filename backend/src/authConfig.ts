const passportConfig = {
  credentials: {
    tenantName: "theboyknowsclasscom.onmicrosoft.com",
    clientID: "5679e5d8-f396-4394-8f8d-9a6b6314e90b",
  },
  policies: {
    policyName: "B2C_1_susi",
  },
  metadata: {
    b2cDomain: "theboyknowsclasscom.b2clogin.com",
    authority: "login.microsoftonline.com",
    discovery: ".well-known/openid-configuration",
    version: "v2.0",
  },
  settings: {
    isB2C: true,
    validateIssuer: false,
    passReqToCallback: true,
    loggingLevel: "info",
    loggingNoPII: false,
  },
  protectedRoutes: {
    todolist: {
      endpoint: "/api/todolist",
      delegatedPermissions: {
        read: ["TaskList.Read", "TaskList.ReadWrite"],
        write: ["TaskList.ReadWrite"],
      },
    },
  },
};

export default passportConfig;
