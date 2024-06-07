import passport from "passport";
import passportAzureAd from "passport-azure-ad";
import { NextFunction, Request, Response } from "express";
import authConfig from "../authConfig";

const options: passportAzureAd.IBearerStrategyOptionWithRequest = {
  identityMetadata: `https://${authConfig.metadata.b2cDomain}/${authConfig.credentials.tenantName}/${authConfig.policies.policyName}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
  clientID: authConfig.credentials.clientID,
  audience: authConfig.credentials.clientID,
  policyName: authConfig.policies.policyName,
  isB2C: authConfig.settings.isB2C,
  validateIssuer: authConfig.settings.validateIssuer,
  loggingLevel: authConfig.settings.loggingLevel as
    | "info"
    | "error"
    | "warn"
    | undefined,
  passReqToCallback: authConfig.settings.passReqToCallback,
  loggingNoPII: authConfig.settings.loggingNoPII, // set this to true in the authConfig.js if you want to enable logging and debugging
};

export const bearerStrategy = new passportAzureAd.BearerStrategy(
  options,
  (req, token, done) => {
    /**
     * Below you can do extended token validation and check for additional claims, such as:
     * - check if the delegated permissions in the 'scp' are the same as the ones declared in the application registration.
     *
     * Bear in mind that you can do any of the above checks within the individual routes and/or controllers as well.
     * For more information, visit: https://learn.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
     */

    /**
     * Lines below verifies if the caller's client ID is in the list of allowed clients.
     * This ensures only the applications with the right client ID can access this API.
     * To do so, we use "azp" claim in the access token. Uncomment the lines below to enable this check.
     */
    // if (!myAllowedClientsList.includes(token.azp)) {
    //     return done(new Error('Unauthorized'), {}, "Client not allowed");
    // }

    // const myAllowedClientsList = [
    //     /* add here the client IDs of the applications that are allowed to call this API */
    // ]

    /**
     * Access tokens that have no 'scp' (for delegated permissions).
     */
    if (!token.hasOwnProperty("scp")) {
      return done(
        new Error("Unauthorized"),
        null,
        "No delegated permissions found"
      );
    }

    done(null, {}, token);
  }
);

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  passport.authenticate(
    "oauth-bearer",
    {
      session: false,
    },
    (
      err: any,
      user?: Express.User | false | null,
      info?: object | string | Array<string | undefined>
    ) => {
      if (err) {
        /**
         * An error occurred during authorization. Either pass the error to the next function
         * for Express error handler to handle, or send a response with the appropriate status code.
         */
        return res.status(401).json({ error: err.message });
      }

      if (!user) {
        // If no user object found, send a 401 response.
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (info) {
        // access token payload will be available in req.authInfo downstream
        req.authInfo = info;
        return next();
      }
    }
  )(req, res, next);
