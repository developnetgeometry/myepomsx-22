
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, List } from 'lucide-react';
import { itemsMaster } from '@/data/sampleData';

const ItemsMasterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the item in sample data
  const item = itemsMaster.find(item => item.id === id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Item Master Detail" 
          icon={<List className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/manage/items-master')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Items Master
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Item: {item?.name || `#${id}`}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Item No</h3>
              <p className="text-base">{item?.itemsNo || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Item Name</h3>
              <p className="text-base">{item?.name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Manufacturer Parts No</h3>
              <p className="text-base">{item?.manufacturerPartsNo || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Manufacturer</h3>
              <p className="text-base">{item?.manufacturer || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
              <p className="text-base">{item?.type || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <p className="text-base">{item?.category || "N/A"}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Item Specifications</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Detailed specifications for this item would appear here.</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Material</span>
                    <span className="text-sm text-muted-foreground">Steel</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Weight</span>
                    <span className="text-sm text-muted-foreground">5.2 kg</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Dimensions</span>
                    <span className="text-sm text-muted-foreground">12cm x 8cm x 4cm</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Related Inventory Items</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="divide-y">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Main Warehouse</p>
                      <p className="text-sm text-muted-foreground">Rack A12</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">15 units</p>
                      <p className="text-sm text-muted-foreground">$750.00</p>
                    </div>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Electrical Store</p>
                      <p className="text-sm text-muted-foreground">Rack E05</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">8 units</p>
                      <p className="text-sm text-muted-foreground">$400.00</p>
                    </div>
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

export default ItemsMasterDetailPage;
