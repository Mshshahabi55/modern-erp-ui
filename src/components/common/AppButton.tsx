import React from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  loading,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      sx={{
        position: 'relative',
        ...props.sx,
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default AppButton;