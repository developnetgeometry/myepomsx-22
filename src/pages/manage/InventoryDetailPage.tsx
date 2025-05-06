
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';
import { inventory } from '@/data/sampleData';

const InventoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the inventory item in sample data
  const inventoryItem = inventory.find(item => item.id === id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Inventory Item Detail" 
          icon={<Package className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/manage/inventory')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inventory Item: {inventoryItem?.itemName || `#${id}`}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Store</h3>
              <p className="text-base">{inventoryItem?.store || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Rack No</h3>
              <p className="text-base">{inventoryItem?.rackNo || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Items No</h3>
              <p className="text-base">{inventoryItem?.itemsNo || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Manufacturer Parts No</h3>
              <p className="text-base">{inventoryItem?.manufacturerPartsNo || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Manufacturer</h3>
              <p className="text-base">{inventoryItem?.manufacturer || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
              <p className="text-base">{inventoryItem?.type || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <p className="text-base">{inventoryItem?.category || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
              <p className="text-base">{inventoryItem?.balance || 0}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Unit Price</h3>
              <p className="text-base">${inventoryItem?.unitPrice.toFixed(2) || "0.00"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Price</h3>
              <p className="text-base">${inventoryItem?.totalPrice.toFixed(2) || "0.00"}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Inventory Levels</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground">Min Level</h4>
                    <p className="text-base">{inventoryItem?.minLevel || 0}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground">Reorder Level</h4>
                    <p className="text-base">{inventoryItem?.reorderLevel || 0}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground">Max Level</h4>
                    <p className="text-base">{inventoryItem?.maxLevel || 0}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Stock Level</h4>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        inventoryItem && inventoryItem.balance <= inventoryItem.minLevel 
                          ? 'bg-red-500' 
                          : inventoryItem && inventoryItem.balance <= inventoryItem.reorderLevel 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${inventoryItem ? 
                          Math.min(100, (inventoryItem.balance / inventoryItem.maxLevel) * 100) : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDetailPage;
