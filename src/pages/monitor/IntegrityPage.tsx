
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Shield } from 'lucide-react';

const IntegrityPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Asset Integrity Management"
      subtitle="Monitor and manage asset integrity data and risk assessments"
      icon={<Shield className="h-6 w-6" />}
    />
  );
};

export default IntegrityPage;
