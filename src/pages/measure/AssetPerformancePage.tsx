
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { LineChart } from 'lucide-react';

const AssetPerformancePage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Asset Performance"
      subtitle="Track and analyze asset performance metrics and trends"
      icon={<LineChart className="h-6 w-6" />}
    />
  );
};

export default AssetPerformancePage;
