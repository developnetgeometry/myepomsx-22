
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { FileText } from 'lucide-react';

const BomAssemblyPage: React.FC = () => {
  return (
    <BlankPageTemplate
      title="Bill of Materials Assembly"
      subtitle="Manage and view equipment bill of materials and assembly information"
      icon={<FileText className="h-6 w-6" />}
    />
  );
};

export default BomAssemblyPage;
