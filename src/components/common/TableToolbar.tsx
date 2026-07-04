import type { ReactNode } from "react";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

interface TableToolbarProps {
  title: string;

  search: ReactNode;

  addButtonText?: string;

  onAdd?: () => void;

  actions?: ReactNode;
}

export function TableToolbar({
  title,
  search,
  addButtonText,
  onAdd,
  actions,
}: TableToolbarProps) {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          {title}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
        >
          {actions}

          {onAdd && (
            <Button
              variant="contained"
              onClick={onAdd}
            >
              {addButtonText}
            </Button>
          )}
        </Stack>
      </Stack>

      <Box mb={3}>{search}</Box>
    </>
  );
}

export default TableToolbar;