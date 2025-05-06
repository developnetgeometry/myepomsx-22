
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Sample data
const initialSystems = [
  {
    id: '1',
    systemId: 'SYS001',
    name: 'Feed Water System',
    description: 'Process feed water treatment and distribution',
    status: 'Active',
  },
  {
    id: '2',
    systemId: 'SYS002',
    name: 'Steam Generation',
    description: 'Main boiler and steam production system',
    status: 'Active',
  },
  {
    id: '3',
    systemId: 'SYS003',
    name: 'Cooling Water',
    description: 'Plant cooling water circulation and treatment',
    status: 'Active',
  },
  {
    id: '4',
    systemId: 'SYS004',
    name: 'Air Compression',
    description: 'Instrument and plant air compression system',
    status: 'Active',
  },
  {
    id: '5',
    systemId: 'SYS005',
    name: 'Power Distribution',
    description: 'Electrical power distribution network',
    status: 'Inactive',
  },
];

const SystemPage: React.FC = () => {
  const navigate = useNavigate();
  const [systems, setSystems] = useState(initialSystems);

  const columns: Column[] = [
    { id: 'systemId', header: 'System ID', accessorKey: 'systemId' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/manage/system/${row.id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Systems" 
        subtitle="Manage plant systems and subsystems"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={systems}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default SystemPage;
