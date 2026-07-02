import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';
import { AppPageHeader } from '@/components/common/AppPageHeader';
import { AppCard } from '@/components/common/AppCard';
import { Loading } from '@/components/feedback/Loading';

const stats = [
  {
    title: 'Revenue',
    value: '$48,295',
    change: '+12.5%',
    icon: AttachMoney,
    color: '#2563eb',
  },
  {
    title: 'Customers',
    value: '1,284',
    change: '+8.2%',
    icon: People,
    color: '#22c55e',
  },
  {
    title: 'Orders',
    value: '3,652',
    change: '+4.3%',
    icon: ShoppingCart,
    color: '#f59e0b',
  },
  {
    title: 'Growth',
    value: '23.1%',
    change: '+2.1%',
    icon: TrendingUp,
    color: '#ef4444',
  },
];

export const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [isLoading] = React.useState(false);

  return (
    <>
      <AppPageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your business."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {isLoading ? (
        <Loading variant="skeleton" rows={3} />
      ) : (
        <>
          {/* Stats Grid - Using CSS Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr 1fr',
              },
              gap: 3,
              mb: 4,
            }}
          >
            {stats.map((stat) => (
              <Paper
                key={stat.title}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: stat.change.startsWith('+') ? 'success.main' : 'error.main',
                        fontWeight: 600,
                      }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`,
                      color: stat.color,
                    }}
                  >
                    <stat.icon />
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Charts Section - Using CSS Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '2fr 1fr',
              },
              gap: 3,
            }}
          >
            <AppCard title="Revenue Overview">
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Chart placeholder</Typography>
              </Box>
            </AppCard>
            <AppCard title="Recent Activity">
              <Box sx={{ py: 2 }}>
                <Typography color="text.secondary" align="center">
                  No recent activity
                </Typography>
              </Box>
            </AppCard>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;