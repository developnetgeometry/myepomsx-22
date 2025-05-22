import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Edit, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { purchaseOrders } from '@/data/purchasingData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const PurchaseOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [po, setPo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the purchase order
    const foundPO = purchaseOrders.find(p => p.id === id);
    
    if (foundPO) {
      setPo(foundPO);
    }
    
    setLoading(false);
  }, [id]);

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'secondary';
      case 'Submitted':
        return 'default'; // Changed from 'primary' to 'default'
      case 'Partially Received':
        return 'warning';
      case 'Fully Received':
        return 'success';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleExport = () => {
    console.log('Exporting PO details...');
  };

  const handleEdit = () => {
    navigate(`/purchasing/purchase-order/${id}/edit`);
  };

  const handleSubmitPO = () => {
    console.log('Submitting PO...');
    // Implementation to update PO status to "Submitted"
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  if (!po) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={() => navigate('/purchasing/purchase-order')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Purchase Orders
        </Button>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Purchase Order not found</h2>
          <p className="mt-2 text-gray-500">The purchase order you're looking for doesn't exist or was deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumbs
            showHome
            overrideItems={[
              { label: 'Home', href: '/' },
              { label: 'Purchasing', href: '/purchasing/purchase-order' },
              { label: 'Purchase Orders', href: '/purchasing/purchase-order' },
              { label: po.poNumber, href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold mt-2">Purchase Order Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/purchasing/purchase-order')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          {po.status === 'Draft' && (
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
          {po.status === 'Draft' && (
            <Button variant="default" onClick={handleSubmitPO}>
              <CheckCircle className="mr-2 h-4 w-4" /> Submit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Purchase Order Information</span>
              <Badge variant={statusBadgeVariant(po.status)}>{po.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">PO Number</h3>
                <p className="font-semibold">{po.poNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">PO Date</h3>
                <p>{format(new Date(po.poDate), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vendor</h3>
                <p>{po.vendorName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Item Count</h3>
                <p>{po.itemCount}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
                <p className="font-semibold">{formatCurrency(po.totalCost)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Date</h3>
                <p>{format(new Date(po.deliveryDate), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Terms</h3>
                <p>{po.terms || 'N/A'}</p>
              </div>
              {po.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p>{po.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {po.attachments && po.attachments.length > 0 ? (
              <ul className="space-y-2">
                {po.attachments.map((attachment: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
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
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Received Quantity</TableHead>
                <TableHead>Pending Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {po.items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                  <TableCell>{item.receivedQuantity}</TableCell>
                  <TableCell>{item.pendingQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end border-t p-4">
          <div className="space-y-2 text-right">
            <div className="text-sm text-gray-500">Total Amount</div>
            <div className="text-2xl font-bold">{formatCurrency(po.totalCost)}</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PurchaseOrderDetailPage;
