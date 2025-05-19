
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Monitor } from 'lucide-react';

const IMSDashboardPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="IMS Dashboard"
      subtitle="Integrity Management System dashboard with key metrics and alerts"
      icon={<Monitor className="h-6 w-6" />}
    />
  );
};

export default IMSDashboardPage;
