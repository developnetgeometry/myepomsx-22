
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Archive } from 'lucide-react';

const AssetsPage: React.FC = () => {
  return <BlankPageTemplate title="Assets" icon={<Archive className="h-6 w-6" />} />;
};

export default AssetsPage;
