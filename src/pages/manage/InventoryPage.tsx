
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Package } from 'lucide-react';

const InventoryPage: React.FC = () => {
  return <BlankPageTemplate title="Inventory" icon={<Package className="h-6 w-6" />} />;
};

export default InventoryPage;
