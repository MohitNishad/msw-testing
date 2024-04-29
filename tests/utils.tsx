import { HttpResponse, delay, http } from "msw";
import { server } from "./mocks/server";
import { routes } from "../src/routes";
import { createMemoryRouter,RouterProvider } from "react-router-dom";
import { render } from "@testing-library/react";

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
}

export const simulateError = (endpoint: string) => {
  server.use(
    http.get(endpoint, () => HttpResponse.error())
  );
}



export const navigateTo = (path: string) => {
    const router = createMemoryRouter(routes, {
        initialEntries: [path],
    });
    render(<RouterProvider router={router} />);
};
