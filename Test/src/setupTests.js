import { afterAll as afterTests, afterEach as afterEachTest, beforeAll as beforeTests } from "vitest";
import { cleanup as cleanUpTests } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server as mockServer } from "./mocks/setup";
import "cross-fetch/polyfill";

afterEachTest(() => {
  cleanUpTests();
});

beforeTests(() => {
  mockServer.listen();
});

afterTests(() => {
  mockServer.close();
});
