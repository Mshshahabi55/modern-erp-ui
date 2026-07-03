import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { ROUTES } from "@/constants/routes";

// Lazy loaded pages
const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Customers = lazy(() => import("@/pages/Customers"));
const Products = lazy(() => import("@/pages/Products"));
const Orders = lazy(() => import("@/pages/Orders"));
const Settings = lazy(() => import("@/pages/Settings"));
const Profile = lazy(() => import("@/pages/Profile"));

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },

  {
    path: ROUTES.AUTH.ROOT,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: ROUTES.ROOT,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD.slice(1),
        element: <Dashboard />,
      },
      {
        path: ROUTES.CUSTOMERS.slice(1),
        element: <Customers />,
      },
      {
        path: ROUTES.PRODUCTS.slice(1),
        element: <Products />,
      },
      {
        path: ROUTES.ORDERS.slice(1),
        element: <Orders />,
      },
      {
        path: ROUTES.SETTINGS.slice(1),
        element: <Settings />,
      },
      {
        path: ROUTES.PROFILE.slice(1),
        element: <Profile />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);