
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { LineChart } from 'lucide-react';

const KPIDashboardPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="KPI Dashboard"
      subtitle="Monitor key performance indicators for assets and maintenance activities"
      icon={<LineChart className="h-6 w-6" />}
    />
  );
};

export default KPIDashboardPage;
