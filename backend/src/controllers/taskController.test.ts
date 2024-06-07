import { getTasks, updateTasks } from "./taskController";
import httpMocks from "node-mocks-http";
import { pool } from "../db";

jest.mock("../db", () => ({ pool: { query: jest.fn() } }));

const _ = {};

describe("Update", () => {
  it("should throw 400 error if body is not in the correct format", async () => {
    const response = httpMocks.createResponse();
    const mNext = jest.fn();
    await updateTasks({} as any, response as any, mNext);

    expect(response.statusCode).toBe(400);
    expect(response._getData()).toEqual(
      JSON.stringify({ error: "No tasks provided" })
    );
  });
});

describe("Get", () => {
  it("should return 500 if there db throws an exception", async () => {
    pool.query = jest.fn().mockRejectedValue(new Error("Test error"));

    const response = httpMocks.createResponse();
    const mNext = jest.fn();
    await getTasks({} as any, response as any, mNext);

    expect(response.statusCode).toBe(500);
    expect(response._getData()).toEqual(
      JSON.stringify({ error: "Error fetching tasks" })
    );
  });
});
