import { NextFunction, Request, Response } from "express";

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Add your custom error handling logic here. For more information, see:
   * http://expressjs.com/en/guide/error-handling.html
   */

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error response
  res.status((err as any).status || 500).send(err);
};
