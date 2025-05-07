
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Box } from 'lucide-react';
import ItemsMasterPage from './ItemsMasterPage';
import InventoryPage from './InventoryPage';
import { Inventory, ItemsMaster } from '@/types/manage';

const MaterialPage: React.FC = () => {
  const navigate = useNavigate();

  const handleItemsMasterRowClick = (row: ItemsMaster) => {
    navigate(`/manage/items-master/${row.id}`);
  };

  const handleInventoryRowClick = (row: Inventory) => {
    navigate(`/manage/inventory/${row.id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Material" 
        icon={<Box className="h-6 w-6" />}
      />
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="items-master">
            <TabsList>
              <TabsTrigger value="items-master">Items Master</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="items-master" className="pt-4">
              <ItemsMasterPage hideHeader={true} onRowClick={handleItemsMasterRowClick} />
            </TabsContent>
            <TabsContent value="inventory" className="pt-4">
              <InventoryPage hideHeader={true} onRowClick={handleInventoryRowClick} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialPage;
