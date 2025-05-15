
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface RBIAssessmentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const RBIAssessmentTabs = ({ activeTab, onTabChange, children }: RBIAssessmentTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="receive">Receive</TabsTrigger>
        <TabsTrigger value="issue">Issue</TabsTrigger>
        <TabsTrigger value="return">Return</TabsTrigger>
        <TabsTrigger value="adjustment">Adjustment</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
        <TabsTrigger value="transaction">Transaction</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default RBIAssessmentTabs;
