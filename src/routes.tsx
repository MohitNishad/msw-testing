import App from "./App";
import Post from "./Post";

export const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/:id",
        element: <Post />,
    },
]
