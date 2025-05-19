import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
interface BlankPageTemplateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}
const BlankPageTemplate: React.FC<BlankPageTemplateProps> = ({
  title,
  subtitle,
  icon
}) => {
  return <div className="space-y-6">
      <PageHeader title={title} />
      
      <Card>
        
      </Card>
    </div>;
};
export default BlankPageTemplate;