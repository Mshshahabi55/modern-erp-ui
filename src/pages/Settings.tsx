import React from 'react';
import { Box } from '@mui/material';
import { AppPageHeader } from '@/components/common/AppPageHeader';
import { AppCard } from '@/components/common/AppCard';

export const Settings: React.FC = () => {
  return (
    <>
      <AppPageHeader
        title="Settings"
        description="Configure your system preferences"
        breadcrumbs={[{ label: 'Settings' }]}
      />
      <Box>
        <AppCard>
          <div>Settings content will go here</div>
        </AppCard>
      </Box>
    </>
  );
};

export default Settings;