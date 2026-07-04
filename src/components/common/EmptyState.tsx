import type { ReactNode } from "react";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface EmptyStateProps {
  title: string;

  description?: string;

  icon?: ReactNode;

  actionText?: string;

  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        py: 8,
        px: 4,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
      >
        {icon && (
          <Box
            sx={{
              fontSize: 64,
            }}
          >
            {icon}
          </Box>
        )}

        <Typography
          variant="h5"
          fontWeight={600}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            color="text.secondary"
            maxWidth={420}
          >
            {description}
          </Typography>
        )}

        {onAction && actionText && (
          <Button
            variant="contained"
            onClick={onAction}
          >
            {actionText}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

export default EmptyState;