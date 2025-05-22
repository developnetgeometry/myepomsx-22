
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Download, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { goodsReceives } from '@/data/purchasingData';

const GoodsReceivePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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

  const columns: Column[] = [
    {
      id: 'grNumber',
      header: 'GR Number',
      accessorKey: 'grNumber',
    },
    {
      id: 'poNumber',
      header: 'PO Number',
      accessorKey: 'poNumber',
    },
    {
      id: 'vendorName',
      header: 'Vendor',
      accessorKey: 'vendorName',
    },
    {
      id: 'deliveryDate',
      header: 'Delivery Date',
      accessorKey: 'deliveryDate',
      cell: (value) => format(new Date(value), 'dd/MM/yyyy'),
    },
    {
      id: 'receiverName',
      header: 'Receiver Name',
      accessorKey: 'receiverName',
    },
    {
      id: 'itemSummary',
      header: 'Item Summary',
      accessorKey: 'id',
      cell: (_, row) => `${row.receivedQuantity}/${row.totalQuantity} items`,
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
              navigate(`/purchasing/goods-receive/${value}`);
            }}
          >
            View
          </Button>
          {row.status !== 'Completed' && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/purchasing/goods-receive/${value}`);
              }}
            >
              Receive
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
    navigate(`/purchasing/goods-receive/${row.id}`);
  };

  const handleCreateGR = () => {
    navigate('/purchasing/goods-receive/new');
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    // Implementation for exporting data
    console.log(`Exporting to ${format}...`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Goods Receive"
        subtitle="Log physical goods received from vendors"
        icon={<Package className="h-6 w-6" />}
        onSearch={handleSearch}
        addNewLabel="+ New Goods Receive"
        onAddNew={handleCreateGR}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={goodsReceives}
            onRowClick={handleRowClick}
          />
        </CardContent>
        <CardFooter className="flex justify-between gap-2 border-t p-4">
          <Button
            size="lg"
            onClick={handleCreateGR}
            className="gap-2 w-full flex-1 justify-center text-base font-medium"
          >
            <Plus className="h-5 w-5" /> Create Goods Receive
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

export default GoodsReceivePage;
