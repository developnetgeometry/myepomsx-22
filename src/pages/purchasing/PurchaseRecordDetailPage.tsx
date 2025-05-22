
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { purchaseRecords, purchaseOrders, goodsReceives } from '@/data/purchasingData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const PurchaseRecordDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState<any>(null);
  const [linkedPO, setLinkedPO] = useState<any>(null);
  const [linkedGR, setLinkedGR] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the purchase record
    const foundRecord = purchaseRecords.find(r => r.id === id);
    
    if (foundRecord) {
      setRecord(foundRecord);
      
      // Find the linked PO
      const foundPO = purchaseOrders.find(po => po.id === foundRecord.poId);
      if (foundPO) setLinkedPO(foundPO);
      
      // Find the linked GR
      const foundGR = goodsReceives.find(gr => 
        gr.poId === foundRecord.poId && 
        gr.items.some(item => item.itemId === foundRecord.itemId)
      );
      if (foundGR) setLinkedGR(foundGR);
    }
    
    setLoading(false);
  }, [id]);

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Received':
        return 'success';
      case 'Partial':
        return 'warning';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleExport = () => {
    console.log('Exporting record details...');
  };

  const navigateToPO = () => {
    if (linkedPO) {
      navigate(`/purchasing/purchase-order/${linkedPO.id}`);
    }
  };

  const navigateToGR = () => {
    if (linkedGR) {
      navigate(`/purchasing/goods-receive/${linkedGR.id}`);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  if (!record) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={() => navigate('/purchasing/purchase-record')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Purchase Records
        </Button>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Record not found</h2>
          <p className="mt-2 text-gray-500">The purchase record you're looking for doesn't exist or was deleted.</p>
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
              { label: 'Purchasing', href: '/purchasing/purchase-record' },
              { label: 'Purchase Records', href: '/purchasing/purchase-record' },
              { label: record.recordId, href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold mt-2">Purchase Record Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/purchasing/purchase-record')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Record Information</span>
              <Badge variant={statusBadgeVariant(record.status)}>{record.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Record ID</h3>
                <p className="font-semibold">{record.recordId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Purchase Date</h3>
                <p>{format(new Date(record.purchaseDate), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Item Name</h3>
                <p>{record.itemName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                <p>{record.quantity}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vendor</h3>
                <p>{record.vendorName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Unit Price</h3>
                <p>{formatCurrency(record.unitPrice)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
                <p className="font-semibold">{formatCurrency(record.totalPrice)}</p>
              </div>
              {record.remarks && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Remarks</h3>
                  <p>{record.remarks}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Linked Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Purchase Order</h3>
              <div className="mt-1 flex items-center">
                <span className="font-semibold">{record.poNumber}</span>
                {linkedPO && (
                  <Button variant="ghost" size="sm" onClick={navigateToPO} className="ml-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {linkedGR && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Goods Receive</h3>
                <div className="mt-1 flex items-center">
                  <span className="font-semibold">{linkedGR.grNumber}</span>
                  <Button variant="ghost" size="sm" onClick={navigateToGR} className="ml-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseRecordDetailPage;
