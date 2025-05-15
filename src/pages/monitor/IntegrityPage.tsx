
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from '@/components/shared/StatusBadge';
import { ShieldIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for pressure vessels
const pressureVesselData = [
  { 
    id: '1', 
    assetCode: 'PV-1001', 
    assetName: 'Separator Vessel', 
    area: 'Process Area A', 
    system: 'Separation System', 
    status: 'Active' 
  },
  { 
    id: '2', 
    assetCode: 'PV-1002', 
    assetName: 'Flash Drum', 
    area: 'Process Area B', 
    system: 'Flash System', 
    status: 'Active' 
  },
  { 
    id: '3', 
    assetCode: 'PV-1003', 
    assetName: 'Storage Tank', 
    area: 'Tank Farm', 
    system: 'Storage System', 
    status: 'Inactive' 
  },
  { 
    id: '4', 
    assetCode: 'PV-1004', 
    assetName: 'Knockout Drum', 
    area: 'Compressor Area', 
    system: 'Gas Compression', 
    status: 'Under Maintenance' 
  },
  { 
    id: '5', 
    assetCode: 'PV-1005', 
    assetName: 'Pressure Vessel', 
    area: 'Process Area C', 
    system: 'High Pressure System', 
    status: 'Active' 
  },
];

// Sample data for piping
const pipingData = [
  { 
    id: '1', 
    assetCode: 'PP-2001', 
    assetName: 'Main Process Line', 
    area: 'Process Area A', 
    system: 'Feed System', 
    status: 'Active' 
  },
  { 
    id: '2', 
    assetCode: 'PP-2002', 
    assetName: 'Product Transfer Line', 
    area: 'Process Area B', 
    system: 'Product System', 
    status: 'Active' 
  },
  { 
    id: '3', 
    assetCode: 'PP-2003', 
    assetName: 'Flare Header', 
    area: 'Utility Area', 
    system: 'Flare System', 
    status: 'Under Inspection' 
  },
  { 
    id: '4', 
    assetCode: 'PP-2004', 
    assetName: 'Cooling Water Line', 
    area: 'Cooling Tower', 
    system: 'Cooling System', 
    status: 'Active' 
  },
  { 
    id: '5', 
    assetCode: 'PP-2005', 
    assetName: 'Steam Header', 
    area: 'Utility Area', 
    system: 'Steam System', 
    status: 'Active' 
  },
  {
    id: 'new-piping-1',
    assetCode: 'PP-2006',
    assetName: 'Process Fluid Transfer Line',
    area: 'Process Area A',
    system: 'Production System',
    status: 'Active'
  },
];

const IntegrityPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pressureVessel");
  
  const columns: Column[] = [
    { id: 'assetCode', header: 'Asset Code', accessorKey: 'assetCode' },
    { id: 'assetName', header: 'Asset Name', accessorKey: 'assetName' },
    { id: 'area', header: 'Area', accessorKey: 'area' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
  ];

  const handleRowClick = (row: any) => {
    // Navigate to the asset integrity detail page with the current tab type and row id
    if (activeTab === 'piping') {
      navigate(`/monitor/integrity/piping/${row.id}`);
    } else {
      navigate(`/monitor/integrity/pressureVessel/${row.id}`);
    }
  };
  
  const handleAddNew = () => {
    if (activeTab === 'piping') {
      navigate('/monitor/integrity/piping/new');
    } else {
      // You can add a similar route for pressure vessels if needed
      // navigate('/monitor/integrity/pressureVessel/new');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Integrity Management" 
        subtitle="Asset integrity monitoring and reporting"
        icon={<ShieldIcon className="h-6 w-6" />}
        onSearch={(query) => console.log('Search:', query)}
      />

      <Tabs 
        defaultValue="pressureVessel" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="pressureVessel">Pressure Vessel</TabsTrigger>
            <TabsTrigger value="piping">Piping</TabsTrigger>
          </TabsList>
          
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New {activeTab === 'piping' ? 'Piping' : 'Pressure Vessel'}
          </Button>
        </div>
        
        <TabsContent value="pressureVessel" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <DataTable
                columns={columns}
                data={pressureVesselData}
                onRowClick={handleRowClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="piping" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <DataTable
                columns={columns}
                data={pipingData}
                onRowClick={handleRowClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrityPage;
