
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, ShieldAlert } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';

// Sample piping data
const initialPipingData = [
  {
    id: '1',
    lineNo: 'L-101',
    asset: 'PV-1001',
    system: 'System-1',
    materialConstruction: 'Carbon Steel',
    nominalBoreDiameter: '4"',
    pipeSchedule: 'Schedule 40',
    riskRank: 'Medium',
    status: 'Active',
  },
  {
    id: '2',
    lineNo: 'L-102',
    asset: 'PP-2003',
    system: 'System-2',
    materialConstruction: 'Stainless Steel',
    nominalBoreDiameter: '6"',
    pipeSchedule: 'Schedule 80',
    riskRank: 'High',
    status: 'Active',
  },
  {
    id: '3',
    lineNo: 'L-103',
    asset: 'PV-1002',
    system: 'System-1',
    materialConstruction: 'Carbon Steel',
    nominalBoreDiameter: '2"',
    pipeSchedule: 'Schedule 40',
    riskRank: 'Low',
    status: 'Active',
  },
];

const IntegrityPage = () => {
  const navigate = useNavigate();
  const [pipingData, setPipingData] = useState(initialPipingData);

  const handleAddNewPiping = () => {
    navigate('/monitor/integrity/piping/new');
  };

  const handleRowClick = (row: any) => {
    navigate(`/monitor/integrity/piping/${row.id}`);
  };

  // Function to get appropriate color class based on risk rank
  const getRiskRankColor = (rank: string) => {
    switch(rank) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: Column[] = [
    { id: 'lineNo', header: 'Line No', accessorKey: 'lineNo' },
    { id: 'asset', header: 'Asset', accessorKey: 'asset' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { id: 'materialConstruction', header: 'Material', accessorKey: 'materialConstruction' },
    { id: 'nominalBoreDiameter', header: 'Nominal Bore', accessorKey: 'nominalBoreDiameter' },
    { id: 'pipeSchedule', header: 'Pipe Schedule', accessorKey: 'pipeSchedule' },
    { 
      id: 'riskRank', 
      header: 'Risk Rank', 
      accessorKey: 'riskRank',
      cell: (value) => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getRiskRankColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrity Module"
        subtitle="Manage piping integrity assessments"
        icon={<ShieldAlert className="h-6 w-6" />}
        onSearch={(query) => console.log('Search:', query)}
      />

      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNewPiping}>
          <Plus className="mr-2 h-4 w-4" /> Add New Piping
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={pipingData}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrityPage;
