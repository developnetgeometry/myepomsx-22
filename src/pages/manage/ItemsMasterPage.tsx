
import React from 'react';
import BlankPageTemplate from '@/components/shared/BlankPageTemplate';
import { List } from 'lucide-react';

const ItemsMasterPage: React.FC = () => {
  return <BlankPageTemplate title="Items Master" icon={<List className="h-6 w-6" />} />;
};

export default ItemsMasterPage;
