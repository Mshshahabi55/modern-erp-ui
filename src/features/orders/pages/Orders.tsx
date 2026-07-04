import React from 'react';
import { Box } from '@mui/material';
import { AppPageHeader } from '@/components/common/AppPageHeader';
import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/feedback/EmptyState';

export const Orders: React.FC = () => {
  return (
    <>
      <AppPageHeader
        title="Orders"
        description="View and manage orders"
        breadcrumbs={[{ label: 'Orders' }]}
      />
      <Box>
        <AppCard>
          <EmptyState
            title="No orders"
            description="Orders will appear here once customers place them."
          />
        </AppCard>
      </Box>
    </>
  );
};

export default Orders;