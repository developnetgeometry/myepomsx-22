
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Hard_Drive } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
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

// Sample data for RMS assets
const initialAssets = [
  {
    id: '1',
    assetId: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    location: 'North Field',
    system: 'Gas Compression',
    healthStatus: 'Good',
    lastSync: '2025-04-28 09:15'
  },
  {
    id: '2',
    assetId: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    location: 'Pipeline Junction B',
    system: 'Flow Control',
    healthStatus: 'Fair',
    lastSync: '2025-04-28 08:45'
  },
  {
    id: '3',
    assetId: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    location: 'Central Processing',
    system: 'Pressure Monitoring',
    healthStatus: 'Poor',
    lastSync: '2025-04-27 23:10'
  },
  {
    id: '4',
    assetId: 'RMS-A004',
    assetName: 'Storage Tank Level Sensor',
    location: 'Tank Farm',
    system: 'Level Monitoring',
    healthStatus: 'Good',
    lastSync: '2025-04-28 10:30'
  },
  {
    id: '5',
    assetId: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    location: 'Pump Station 2',
    system: 'Temperature Monitoring',
    healthStatus: 'Critical',
    lastSync: '2025-04-28 07:50'
  }
];

const systems = [
  'Gas Compression',
  'Flow Control',
  'Pressure Monitoring',
  'Level Monitoring',
  'Temperature Monitoring',
  'Vibration Monitoring'
];

const locations = [
  'North Field',
  'Pipeline Junction B',
  'Central Processing',
  'Tank Farm',
  'Pump Station 2',
  'East Wing'
];

const RMSAssetListPage: React.FC = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    assetId: '',
    assetName: '',
    location: '',
    system: '',
    healthStatus: 'Good',
    lastSync: ''
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    const now = new Date();
    setFormData({
      id: `${assets.length + 1}`,
      assetId: `RMS-A${String(assets.length + 1).padStart(3, '0')}`,
      assetName: '',
      location: locations[0],
      system: systems[0],
      healthStatus: 'Good',
      lastSync: now.toISOString().slice(0, 16).replace('T', ' ')
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setFormData({
      ...row
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setAssets(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setAssets(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'assetId', header: 'Asset ID', accessorKey: 'assetId' },
    { id: 'assetName', header: 'Asset Name', accessorKey: 'assetName' },
    { id: 'location', header: 'Location', accessorKey: 'location' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { 
      id: 'healthStatus', 
      header: 'Health Status', 
      accessorKey: 'healthStatus',
      cell: (value) => <StatusBadge status={value} />
    },
    { id: 'lastSync', header: 'Last Sync', accessorKey: 'lastSync' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="RMS Asset List" 
        subtitle="Remote monitoring system assets"
        icon={<Hard_Drive className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ Add Asset"
        onSearch={(query) => console.log('Search:', query)}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={assets}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit RMS Asset' : 'Add New RMS Asset'}
            </DialogTitle>
            <DialogDescription>
              Enter asset details and connection information.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset ID</Label>
                <Input
                  id="assetId"
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input
                  id="assetName"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system">System</Label>
                <select
                  id="system"
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {systems.map(system => (
                    <option key={system} value={system}>{system}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="healthStatus">Health Status</Label>
                <select
                  id="healthStatus"
                  name="healthStatus"
                  value={formData.healthStatus}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastSync">Last Sync</Label>
                <Input
                  id="lastSync"
                  name="lastSync"
                  value={formData.lastSync}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RMSAssetListPage;
