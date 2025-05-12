
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlankPageTemplateProps {
  title: string;
  icon?: React.ReactNode;
}

const BlankPageTemplate: React.FC<BlankPageTemplateProps> = ({ title, icon }) => {
  return (
    <div className="space-y-6">
      <PageHeader title={title} />
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="text-lg font-medium">Welcome to {title}</h3>
                <p className="text-muted-foreground mt-2">
                  This page is currently under development. The content will be added in future updates.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlankPageTemplate;
