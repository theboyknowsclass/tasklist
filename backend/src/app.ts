import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import passport from "passport";

import tasklist from "./routes/tasklist";
import { authenticateMiddleware, bearerStrategy } from "./middleware/auth";
import { errorHandling } from "./middleware/errorHandling";

const app = express();

/**
 * HTTP request handlers should not perform expensive operations such as accessing the file system,
 * executing an operating system command or interacting with a database without limiting the rate at
 * which requests are accepted. Otherwise, the application becomes vulnerable to denial-of-service attacks
 * where an attacker can cause the application to crash or become unresponsive by issuing a large number of
 * requests at the same time. For more information, visit: https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passport.use(bearerStrategy);
app.use("/api", authenticateMiddleware);
app.use("/api", tasklist);
app.use(errorHandling);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.info("Listening on port " + port);
});

module.exports = app;
