
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { LineChart } from 'lucide-react';

const CostAnalysisPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Cost Analysis"
      subtitle="Analyze maintenance and operational costs across assets and facilities"
      icon={<LineChart className="h-6 w-6" />}
    />
  );
};

export default CostAnalysisPage;
