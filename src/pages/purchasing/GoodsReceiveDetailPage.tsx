
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { goodsReceives, purchaseOrders } from '@/data/purchasingData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const GoodsReceiveDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gr, setGR] = useState<any>(null);
  const [linkedPO, setLinkedPO] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the goods receive record
    const foundGR = goodsReceives.find(g => g.id === id);
    
    if (foundGR) {
      setGR(foundGR);
      
      // Find the linked PO
      const foundPO = purchaseOrders.find(po => po.id === foundGR.poId);
      if (foundPO) setLinkedPO(foundPO);
    }
    
    setLoading(false);
  }, [id]);

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Partial':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'outline';
    }
  };

  const conditionBadgeVariant = (condition: string) => {
    return condition === 'Good' ? 'success' : 'destructive';
  };

  const handleExport = () => {
    console.log('Exporting GR details...');
  };

  const navigateToPO = () => {
    if (linkedPO) {
      navigate(`/purchasing/purchase-order/${linkedPO.id}`);
    }
  };

  const handleFinalize = () => {
    console.log('Finalizing goods receive...');
    // Implementation to update goods receive status
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  if (!gr) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={() => navigate('/purchasing/goods-receive')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Goods Receive
        </Button>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Goods Receive record not found</h2>
          <p className="mt-2 text-gray-500">The goods receive record you're looking for doesn't exist or was deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Purchasing', href: '/purchasing/goods-receive' },
              { label: 'Goods Receive', href: '/purchasing/goods-receive' },
              { label: gr.grNumber, href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold mt-2">Goods Receive Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/purchasing/goods-receive')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          {gr.status !== 'Completed' && (
            <Button variant="default" onClick={handleFinalize}>
              <CheckCircle className="mr-2 h-4 w-4" /> Finalize Receipt
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Goods Receive Information</span>
              <Badge variant={statusBadgeVariant(gr.status)}>{gr.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">GR Number</h3>
                <p className="font-semibold">{gr.grNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">PO Number</h3>
                <div className="flex items-center gap-2">
                  <p>{gr.poNumber}</p>
                  {linkedPO && (
                    <Button variant="ghost" size="sm" onClick={navigateToPO}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vendor</h3>
                <p>{gr.vendorName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Item Count</h3>
                <p>{gr.itemCount}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Date</h3>
                <p>{format(new Date(gr.deliveryDate), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Receiver Name</h3>
                <p>{gr.receiverName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Received Quantity</h3>
                <p>{`${gr.receivedQuantity} out of ${gr.totalQuantity} items`}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {gr.attachments && gr.attachments.length > 0 ? (
              <ul className="space-y-2">
                {gr.attachments.map((attachment: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span>{attachment}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Download className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No documents attached</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Received Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Ordered Qty</TableHead>
                <TableHead>Received Qty</TableHead>
                <TableHead>Pending Qty</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gr.items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.orderedQuantity}</TableCell>
                  <TableCell>{item.receivedQuantity}</TableCell>
                  <TableCell>{item.pendingQuantity}</TableCell>
                  <TableCell>
                    <Badge variant={conditionBadgeVariant(item.condition)}>
                      {item.condition}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.remarks || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoodsReceiveDetailPage;
