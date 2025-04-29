
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Package } from 'lucide-react';

const PackagePage: React.FC = () => {
  return <BlankPageTemplate title="Package" icon={<Package className="h-6 w-6" />} />;
};

export default PackagePage;
