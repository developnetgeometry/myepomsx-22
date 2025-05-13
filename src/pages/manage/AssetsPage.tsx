
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { assets } from '@/data/sampleData';
import { Layers } from 'lucide-react';

const AssetsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data] = React.useState(assets);

  const columns: Column[] = [
    { id: 'id', header: 'Asset ID', accessorKey: 'id' },
    { id: 'name', header: 'Asset Name', accessorKey: 'name' },
    { id: 'type', header: 'Type', accessorKey: 'type' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
    { id: 'location', header: 'Location', accessorKey: 'location' },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/manage/assets/${row.id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assets" 
        icon={<Layers className="h-6 w-6" />} 
        onSearch={(query) => console.log('Search:', query)}
        onAddNew={() => navigate('/manage/assets/new')}
        addNewLabel="+ Add Asset"
      />
      
      <DataTable 
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default AssetsPage;
