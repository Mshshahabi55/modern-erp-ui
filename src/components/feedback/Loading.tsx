import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';

interface LoadingProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
  variant?: 'spinner' | 'skeleton';
  rows?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 40,
  message,
  fullScreen = false,
  variant = 'spinner',
  rows = 5,
}) => {
  if (variant === 'skeleton') {
    return (
      <Box sx={{ width: '100%' }}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} height={40} sx={{ mb: 1, borderRadius: 1 }} />
        ))}
      </Box>
    );
  }

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={4}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default Loading;