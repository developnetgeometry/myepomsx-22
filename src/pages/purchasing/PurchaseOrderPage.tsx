
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Download, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { purchaseOrders } from '@/data/purchasingData';

const PurchaseOrderPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'secondary';
      case 'Submitted':
        return 'primary';
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

  const columns: Column[] = [
    {
      id: 'poNumber',
      header: 'PO Number',
      accessorKey: 'poNumber',
    },
    {
      id: 'poDate',
      header: 'PO Date',
      accessorKey: 'poDate',
      cell: (value) => format(new Date(value), 'dd/MM/yyyy'),
    },
    {
      id: 'vendorName',
      header: 'Vendor',
      accessorKey: 'vendorName',
    },
    {
      id: 'itemCount',
      header: 'Item Count',
      accessorKey: 'itemCount',
    },
    {
      id: 'deliveryDate',
      header: 'Delivery Date',
      accessorKey: 'deliveryDate',
      cell: (value) => format(new Date(value), 'dd/MM/yyyy'),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => (
        <Badge variant={statusBadgeVariant(value)}>{value}</Badge>
      ),
    },
    {
      id: 'totalCost',
      header: 'Total Cost',
      accessorKey: 'totalCost',
      cell: (value) => formatCurrency(value),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      cell: (value, row) => (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/purchasing/purchase-order/${value}`);
            }}
          >
            View
          </Button>
          {row.status === 'Draft' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/purchasing/purchase-order/${value}/edit`);
              }}
            >
              Edit
            </Button>
          )}
          {row.status === 'Draft' && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                // Implementation for submit action
                console.log(`Submit PO ${row.poNumber}`);
              }}
            >
              Submit
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRowClick = (row: any) => {
    navigate(`/purchasing/purchase-order/${row.id}`);
  };

  const handleCreatePO = () => {
    navigate('/purchasing/purchase-order/new');
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    // Implementation for exporting data
    console.log(`Exporting to ${format}...`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Orders"
        subtitle="Manage purchase transactions"
        icon={<FileText className="h-6 w-6" />}
        onSearch={handleSearch}
        addNewLabel="+ New Purchase Order"
        onAddNew={handleCreatePO}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={purchaseOrders}
            onRowClick={handleRowClick}
          />
        </CardContent>
        <CardFooter className="flex justify-between gap-2 border-t p-4">
          <Button
            size="lg"
            onClick={handleCreatePO}
            className="gap-2 w-full flex-1 justify-center text-base font-medium"
          >
            <Plus className="h-5 w-5" /> Create New PO
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleExport('excel')}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              Export to Excel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport('pdf')}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PurchaseOrderPage;
