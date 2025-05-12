
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { HardDrive, Filter } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Sample data for RMS assets
const initialAssets = [
  {
    id: '1',
    assetNo: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    package: 'Package A',
    system: 'Gas Compression',
    facility: 'North Field',
    assetType: 'Compressor',
    model: 'CP-5000',
    status: 'Operational',
    sce: 'Yes',
    criticalityCode: 'A1'
  },
  {
    id: '2',
    assetNo: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    package: 'Package B',
    system: 'Flow Control',
    facility: 'Pipeline Junction B',
    assetType: 'Valve',
    model: 'FCV-200-S',
    status: 'Maintenance',
    sce: 'No',
    criticalityCode: 'B2'
  },
  {
    id: '3',
    assetNo: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    package: 'Package A',
    system: 'Pressure Monitoring',
    facility: 'Central Processing',
    assetType: 'Sensor',
    model: 'PT-3000',
    status: 'Critical',
    sce: 'Yes',
    criticalityCode: 'A1'
  },
  {
    id: '4',
    assetNo: 'RMS-A004',
    assetName: 'Storage Tank Level Sensor',
    package: 'Package C',
    system: 'Level Monitoring',
    facility: 'Tank Farm',
    assetType: 'Sensor',
    model: 'LT-500',
    status: 'Operational',
    sce: 'No',
    criticalityCode: 'C2'
  },
  {
    id: '5',
    assetNo: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    package: 'Package D',
    system: 'Temperature Monitoring',
    facility: 'Pump Station 2',
    assetType: 'Sensor',
    model: 'TS-100',
    status: 'Offline',
    sce: 'Yes',
    criticalityCode: 'A2'
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

const facilities = [
  'North Field',
  'Pipeline Junction B',
  'Central Processing',
  'Tank Farm',
  'Pump Station 2',
  'East Wing'
];

const packages = [
  'Package A',
  'Package B',
  'Package C',
  'Package D',
  'Package E'
];

const assetTypes = [
  'Compressor',
  'Valve',
  'Sensor',
  'Pump',
  'Motor',
  'Tank',
  'Exchanger'
];

const criticalityCodes = [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
  'D1',
  'D2'
];

interface UptimeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
}

const UptimeEntryDialog: React.FC<UptimeDialogProps> = ({ isOpen, onClose, asset }) => {
  const [uptimeData, setUptimeData] = useState({
    upTime: 24.0,
    standBy: 0,
    unplannedShutdown: 0,
    plannedShutdown: 0,
    date: new Date().toISOString().split('T')[0],
    description: 'Normal operation'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUptimeData(prev => ({
      ...prev,
      [name]: name === 'date' || name === 'description' ? value : parseFloat(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save data to a backend
    toast.success(`Uptime entry saved for ${asset.assetName}`);
    onClose();
  };

  if (!asset) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Uptime Entry - {asset.assetName}</DialogTitle>
          <DialogDescription>
            Enter uptime details for asset {asset.assetNo} for the selected date.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={uptimeData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="upTime">Up Time (hrs)</Label>
              <Input
                id="upTime"
                name="upTime"
                type="number"
                value={uptimeData.upTime}
                onChange={handleChange}
                min="0"
                max="24"
                step="0.1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="standBy">Stand By (hrs)</Label>
              <Input
                id="standBy"
                name="standBy"
                type="number"
                value={uptimeData.standBy}
                onChange={handleChange}
                min="0"
                max="24"
                step="0.1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unplannedShutdown">Unplanned Shutdown (hrs)</Label>
              <Input
                id="unplannedShutdown"
                name="unplannedShutdown"
                type="number"
                value={uptimeData.unplannedShutdown}
                onChange={handleChange}
                min="0"
                max="24"
                step="0.1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plannedShutdown">Planned Shutdown (hrs)</Label>
              <Input
                id="plannedShutdown"
                name="plannedShutdown"
                type="number"
                value={uptimeData.plannedShutdown}
                onChange={handleChange}
                min="0"
                max="24"
                step="0.1"
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={uptimeData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const RMSAssetListPage: React.FC = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(initialAssets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    assetNo: '',
    assetName: '',
    package: '',
    system: '',
    facility: '',
    assetType: '',
    model: '',
    status: 'Operational',
    sce: 'No',
    criticalityCode: 'C2'
  });
  const [isUptimeDialogOpen, setIsUptimeDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${assets.length + 1}`,
      assetNo: `RMS-A${String(assets.length + 1).padStart(3, '0')}`,
      assetName: '',
      package: packages[0],
      system: systems[0],
      facility: facilities[0],
      assetType: assetTypes[0],
      model: '',
      status: 'Operational',
      sce: 'No',
      criticalityCode: 'C2'
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
      toast.success(`Asset ${formData.assetNo} updated successfully`);
    } else {
      setAssets(prev => [...prev, formData]);
      toast.success(`New asset ${formData.assetNo} added successfully`);
    }
    
    setIsDialogOpen(false);
  };
  
  const handleAssetNoClick = (row: any) => {
    navigate(`/monitor/rms-asset-detail/${row.id}`);
  };

  const columns: Column[] = [
    { 
      id: 'assetNo', 
      header: 'Asset No', 
      accessorKey: 'assetNo',
      cell: (value) => (
        <Button 
          variant="link" 
          className="p-0 h-auto font-normal text-blue-600 underline"
          onClick={() => handleAssetNoClick(value)}
        >
          {value}
        </Button>
      )
    },
    { id: 'assetName', header: 'Asset Name', accessorKey: 'assetName' },
    { id: 'package', header: 'Package', accessorKey: 'package' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { id: 'facility', header: 'Facility', accessorKey: 'facility' },
    { id: 'assetType', header: 'Asset Type', accessorKey: 'assetType' },
    { id: 'model', header: 'Model', accessorKey: 'model' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
    { id: 'sce', header: 'SCE', accessorKey: 'sce' },
    { id: 'criticalityCode', header: 'Criticality Code', accessorKey: 'criticalityCode' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="RMS Asset List" 
        subtitle="Remote monitoring system assets"
        icon={<HardDrive className="h-6 w-6" />}
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
        <DialogContent className="sm:max-w-[700px]">
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
                <Label htmlFor="assetNo">Asset No</Label>
                <Input
                  id="assetNo"
                  name="assetNo"
                  value={formData.assetNo}
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
                <Label htmlFor="package">Package</Label>
                <Select
                  value={formData.package}
                  onValueChange={(value) => setFormData({...formData, package: value})}
                >
                  <SelectTrigger id="package">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map(pkg => (
                      <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system">System</Label>
                <Select
                  value={formData.system}
                  onValueChange={(value) => setFormData({...formData, system: value})}
                >
                  <SelectTrigger id="system">
                    <SelectValue placeholder="Select system" />
                  </SelectTrigger>
                  <SelectContent>
                    {systems.map(system => (
                      <SelectItem key={system} value={system}>{system}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facility">Facility</Label>
                <Select
                  value={formData.facility}
                  onValueChange={(value) => setFormData({...formData, facility: value})}
                >
                  <SelectTrigger id="facility">
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                  <SelectContent>
                    {facilities.map(facility => (
                      <SelectItem key={facility} value={facility}>{facility}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <Select
                  value={formData.assetType}
                  onValueChange={(value) => setFormData({...formData, assetType: value})}
                >
                  <SelectTrigger id="assetType">
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    {assetTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sce">SCE</Label>
                <Select
                  value={formData.sce}
                  onValueChange={(value) => setFormData({...formData, sce: value})}
                >
                  <SelectTrigger id="sce">
                    <SelectValue placeholder="Select SCE status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="criticalityCode">Criticality Code</Label>
                <Select
                  value={formData.criticalityCode}
                  onValueChange={(value) => setFormData({...formData, criticalityCode: value})}
                >
                  <SelectTrigger id="criticalityCode">
                    <SelectValue placeholder="Select criticality code" />
                  </SelectTrigger>
                  <SelectContent>
                    {criticalityCodes.map(code => (
                      <SelectItem key={code} value={code}>{code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      
      <UptimeEntryDialog 
        isOpen={isUptimeDialogOpen} 
        onClose={() => setIsUptimeDialogOpen(false)} 
        asset={selectedAsset}
      />
    </div>
  );
};

export default RMSAssetListPage;
