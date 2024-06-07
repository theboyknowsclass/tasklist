export const dbMock = (overrides = {}) => {
  const client = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
    ...overrides,
  };

  jest.mock("pg", () => {
    const mClient = {
      connect: client.connect,
      query: client.query,
      end: client.end,
    };
    return { Client: jest.fn(() => mClient) };
  });

  return client;
};
