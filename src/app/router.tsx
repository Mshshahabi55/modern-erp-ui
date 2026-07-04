import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { Loading } from "@/components/feedback/Loading";
import { ROUTES } from "@/constants/routes";

// Auth
const Login = lazy(
  () => import("@/features/auth/pages/Login")
);

// Dashboard
const Dashboard = lazy(() => import("@/features/dashboard/pages/Dashboard"));

// Customers (Feature-Based)
const Customers = lazy(
  () => import("@/features/customers/pages/CustomersPage")
);

// Temporary Pages (will migrate later)
const Products = lazy(() => import("@/features/products/pages/Products"));
const Orders = lazy(() => import("@/features/orders/pages/Orders"));
const Settings = lazy(() => import("@/features/settings/pages/Settings"));
const Profile = lazy(() => import("@/features/profile/pages/Profile"));

const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
    {component}
  </Suspense>
);

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
        element: withSuspense(<Login />),
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
        element: withSuspense(<Dashboard />),
      },
      {
        path: ROUTES.CUSTOMERS.slice(1),
        element: withSuspense(<Customers />),
      },
      {
        path: ROUTES.PRODUCTS.slice(1),
        element: withSuspense(<Products />),
      },
      {
        path: ROUTES.ORDERS.slice(1),
        element: withSuspense(<Orders />),
      },
      {
        path: ROUTES.SETTINGS.slice(1),
        element: withSuspense(<Settings />),
      },
      {
        path: ROUTES.PROFILE.slice(1),
        element: withSuspense(<Profile />),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);

export default router;