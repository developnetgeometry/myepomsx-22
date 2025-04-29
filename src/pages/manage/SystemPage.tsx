
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Settings } from 'lucide-react';

const SystemPage: React.FC = () => {
  return <BlankPageTemplate title="System" icon={<Settings className="h-6 w-6" />} />;
};

export default SystemPage;
