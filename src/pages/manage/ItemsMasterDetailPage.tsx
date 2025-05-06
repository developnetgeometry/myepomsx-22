
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const ItemsMasterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Item Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/manage/items-master')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Items Master
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Item #{id}</CardTitle>
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
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <p className="text-base">Item category would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Supplier</h3>
              <p className="text-base">Supplier information would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
              <p className="text-base">Price information would appear here</p>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Item Specifications</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">Detailed item specifications would appear here...</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemsMasterDetailPage;
