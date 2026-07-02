import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { CardProps } from '@mui/material/Card';

interface AppCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  subtitle,
  action,
  children,
  noPadding,
  sx,
  ...props
}) => {
  return (
    <Card
      {...props}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {(title || action) && (
        <CardHeader
          title={title && <Typography variant="h6">{title}</Typography>}
          subheader={subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
          action={action}
          sx={{
            pb: 0,
            px: 3,
            pt: 3,
          }}
        />
      )}
      <CardContent
        sx={{
          p: noPadding ? 0 : 3,
          '&:last-child': {
            pb: noPadding ? 0 : 3,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default AppCard;