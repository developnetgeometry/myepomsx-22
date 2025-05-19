
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Box } from 'lucide-react';

const InventoryGroupsPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Inventory Groups"
      subtitle="Manage and view grouped inventory items and their relationships"
      icon={<Box className="h-6 w-6" />}
    />
  );
};

export default InventoryGroupsPage;
