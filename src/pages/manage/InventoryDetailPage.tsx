
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';

const InventoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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
          <CardTitle>Inventory Item #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Item ID</h3>
              <p className="text-base">{id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Item Name</h3>
              <p className="text-base">Item name would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
              <p className="text-base">Quantity information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
              <p className="text-base">Storage location would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Min Quantity</h3>
              <p className="text-base">Minimum quantity would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Restocked</h3>
              <p className="text-base">Last restocked date would appear here</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Stock History</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Inventory history would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDetailPage;
