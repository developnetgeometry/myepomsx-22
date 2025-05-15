
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { LineChart } from 'lucide-react';

const WorkAnalyticsPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Work Analytics"
      subtitle="Analyze work order completion, efficiency, and resource utilization"
      icon={<LineChart className="h-6 w-6" />}
    />
  );
};

export default WorkAnalyticsPage;
