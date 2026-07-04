import React from 'react';
import { Box } from '@mui/material';
import { AppPageHeader } from '@/components/common/AppPageHeader';
import { AppCard } from '@/components/common/AppCard';

export const Profile: React.FC = () => {
  return (
    <>
      <AppPageHeader
        title="Profile"
        description="Manage your account settings"
        breadcrumbs={[{ label: 'Profile' }]}
      />
      <Box>
        <AppCard>
          <div>Profile content will go here</div>
        </AppCard>
      </Box>
    </>
  );
};

export default Profile;