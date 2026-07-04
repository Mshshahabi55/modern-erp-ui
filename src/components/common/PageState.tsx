import type { ReactNode } from "react";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

interface PageStateProps {
  loading: boolean;

  error?: unknown;

  empty: boolean;

  emptyComponent: ReactNode;

  children: ReactNode;
}

export function PageState({
  loading,
  error,
  empty,
  emptyComponent,
  children,
}: PageStateProps) {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error instanceof Error
          ? error.message
          : "Something went wrong."}
      </Alert>
    );
  }

  if (empty) {
    return <>{emptyComponent}</>;
  }

  return <>{children}</>;
}

export default PageState;