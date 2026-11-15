import "@testing-library/jest-dom/vitest";

localStorage.setItem("me-lang", "es");
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});
