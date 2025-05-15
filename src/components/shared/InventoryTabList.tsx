
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InventoryTabListProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children?: React.ReactNode; // Added to allow TabsContent to be nested
}

const InventoryTabList = ({ activeTab, onTabChange, children }: InventoryTabListProps) => {
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
      {children} {/* This allows TabsContent components to be nested within the Tabs context */}
    </Tabs>
  );
};

export default InventoryTabList;
