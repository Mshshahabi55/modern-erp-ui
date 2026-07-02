import React from 'react';
import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AppPageHeader } from '@/components/common/AppPageHeader';
import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/feedback/EmptyState';

export const Customers: React.FC = () => {
  const handleAddCustomer = () => {
    console.log('Add customer');
  };

  return (
    <>
      <AppPageHeader
        title="Customers"
        description="Manage your customer relationships"
        breadcrumbs={[{ label: 'Customers' }]}
        actions={
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddCustomer}
          >
            Add Customer
          </Button>
        }
      />

      <Box>
        <AppCard>
          <EmptyState
            title="No customers yet"
            description="Get started by adding your first customer."
            actionLabel="Add Customer"
            onAction={handleAddCustomer}
          />
        </AppCard>
      </Box>
    </>
  );
};

export default Customers;