import React from 'react';
import { Box } from '@mui/material';
import { AppPageHeader } from '@/components/common/AppPageHeader';
import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/feedback/EmptyState';

export const Products: React.FC = () => {
  return (
    <>
      <AppPageHeader
        title="Products"
        description="Manage your product inventory"
        breadcrumbs={[{ label: 'Products' }]}
      />
      <Box>
        <AppCard>
          <EmptyState
            title="No products"
            description="Start adding your products to inventory."
          />
        </AppCard>
      </Box>
    </>
  );
};

export default Products;