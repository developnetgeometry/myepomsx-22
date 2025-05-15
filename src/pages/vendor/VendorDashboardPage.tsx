
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Users } from 'lucide-react';

const VendorDashboardPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Vendor Dashboard"
      subtitle="Overview of vendor performance, contracts, and work status"
      icon={<Users className="h-6 w-6" />}
    />
  );
};

export default VendorDashboardPage;
