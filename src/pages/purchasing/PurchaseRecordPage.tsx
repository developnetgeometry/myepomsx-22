
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { purchaseRecords } from '@/data/purchasingData';

const PurchaseRecordPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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

  const columns: Column[] = [
    {
      id: 'recordId',
      header: 'Record ID',
      accessorKey: 'recordId',
    },
    {
      id: 'purchaseDate',
      header: 'Purchase Date',
      accessorKey: 'purchaseDate',
      cell: (value) => format(new Date(value), 'dd/MM/yyyy'),
    },
    {
      id: 'itemName',
      header: 'Item Name',
      accessorKey: 'itemName',
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      id: 'vendorName',
      header: 'Vendor',
      accessorKey: 'vendorName',
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
      id: 'unitPrice',
      header: 'Unit Price',
      accessorKey: 'unitPrice',
      cell: (value) => formatCurrency(value),
    },
    {
      id: 'totalPrice',
      header: 'Total Price',
      accessorKey: 'totalPrice',
      cell: (value) => formatCurrency(value),
    },
    {
      id: 'poNumber',
      header: 'Linked PO',
      accessorKey: 'poNumber',
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      cell: (value) => (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/purchasing/purchase-record/${value}`);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRowClick = (row: any) => {
    navigate(`/purchasing/purchase-record/${row.id}`);
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    // Implementation for exporting data
    console.log(`Exporting to ${format}...`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Records"
        subtitle="View finalized procurement data"
        icon={<FileText className="h-6 w-6" />}
        onSearch={handleSearch}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={purchaseRecords}
            onRowClick={handleRowClick}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t p-4">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default PurchaseRecordPage;
