
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Box } from 'lucide-react';

const MaterialPage: React.FC = () => {
  return <BlankPageTemplate title="Material" icon={<Box className="h-6 w-6" />} />;
};

export default MaterialPage;
