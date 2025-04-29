
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Layers } from 'lucide-react';

const BomAssemblyPage: React.FC = () => {
  return <BlankPageTemplate title="BOM Assembly" icon={<Layers className="h-6 w-6" />} />;
};

export default BomAssemblyPage;
