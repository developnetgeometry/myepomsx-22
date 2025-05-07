
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

interface InventoryTabListProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const InventoryTabList = ({ activeTab, onTabChange }: InventoryTabListProps) => {
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
    </Tabs>
  );
};

export default InventoryTabList;
