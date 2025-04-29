
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { Building } from 'lucide-react';

const FacilitiesPage: React.FC = () => {
  return <BlankPageTemplate title="Facilities" icon={<Building className="h-6 w-6" />} />;
};

export default FacilitiesPage;
