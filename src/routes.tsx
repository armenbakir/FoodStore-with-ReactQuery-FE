import App from "@App";
import { createBrowserRouter } from "react-router-dom";
import { Logout, ProtectedRoute } from "@components";
import {
  CustomersPage,
  FoodFormPage,
  FoodsPage,
  LoginPage,
  NotFoundPage,
  OrdersPage,
  RegisterPage,
} from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/foods", element: <FoodsPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/foods/:id", element: <FoodFormPage /> },
          { path: "/customers", element: <CustomersPage /> },
          { path: "/orders", element: <OrdersPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/logout", element: <Logout /> },
]);

export default router;
