import React from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink, Stack } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  path?: string;
}

interface AppPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export const AppPageHeader: React.FC<AppPageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 2 }}
          aria-label="breadcrumb"
        >
          <MuiLink
            component={Link}
            to="/dashboard"
            underline="hover"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            Dashboard
          </MuiLink>
          {breadcrumbs.map((item) =>
            item.path ? (
              <MuiLink
                key={item.label}
                component={Link}
                to={item.path}
                underline="hover"
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                {item.label}
              </MuiLink>
            ) : (
              <Typography key={item.label} color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {item.label}
              </Typography>
            )
          )}
        </Breadcrumbs>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: '-0.02em' }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
        {actions && <Box>{actions}</Box>}
      </Stack>
    </Box>
  );
};

export default AppPageHeader;