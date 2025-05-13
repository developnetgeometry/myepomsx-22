
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import TableFilters from '@/components/shared/TableFilters';
import { Card, CardContent } from '@/components/ui/card';
import { HardDrive, Download, FileText, Filter, X } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { formatDateTime } from '@/utils/formatters';
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
    assetNo: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    package: 'Gas Compression Package 1',
    system: 'Gas Compression',
    facility: 'North Field',
    assetTag: 'COMP-001',
    model: 'Atlas Copco GA 75',
    status: 'Active',
    sceCode: 'SCE-0023',
    criticalityCode: 'C1',
    healthStatus: 'Good',
    lastSync: '2025-05-12 09:15:22'
  },
  {
    id: '2',
    assetNo: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    package: 'Flow Control Package A',
    system: 'Flow Control',
    facility: 'Pipeline Junction B',
    assetTag: 'FCV-201',
    model: 'Fisher 8580',
    status: 'Active',
    sceCode: 'SCE-0045',
    criticalityCode: 'C2',
    healthStatus: 'Fair',
    lastSync: '2025-05-12 08:45:30'
  },
  {
    id: '3',
    assetNo: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    package: 'Monitoring Package 3',
    system: 'Pressure Monitoring',
    facility: 'Central Processing',
    assetTag: 'PT-305',
    model: 'Rosemount 3051',
    status: 'Active',
    sceCode: 'SCE-0067',
    criticalityCode: 'C3',
    healthStatus: 'Poor',
    lastSync: '2025-05-11 23:10:45'
  },
  {
    id: '4',
    assetNo: 'RMS-A004',
    assetName: 'Storage Tank Level Sensor',
    package: 'Tank Farm Package 2',
    system: 'Level Monitoring',
    facility: 'Tank Farm',
    assetTag: 'TK-LVL-004',
    model: 'Endress+Hauser FMP51',
    status: 'Inactive',
    sceCode: 'SCE-0089',
    criticalityCode: 'C1',
    healthStatus: 'Good',
    lastSync: '2025-05-12 10:30:15'
  },
  {
    id: '5',
    assetNo: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    package: 'Pump Control Package 1',
    system: 'Temperature Monitoring',
    facility: 'Pump Station 2',
    assetTag: 'TEMP-007',
    model: 'Fluke 724',
    status: 'Maintenance',
    sceCode: 'SCE-0112',
    criticalityCode: 'C1',
    healthStatus: 'Critical',
    lastSync: '2025-05-12 07:50:38'
  },
  {
    id: '6',
    assetNo: 'RMS-A006',
    assetName: 'Cooling Tower Fan Motor',
    package: 'Cooling System Package A',
    system: 'Cooling System',
    facility: 'North Field',
    assetTag: 'CT-FAN-003',
    model: 'ABB ACS880',
    status: 'Active',
    sceCode: 'SCE-0134',
    criticalityCode: 'C2',
    healthStatus: 'Good',
    lastSync: '2025-05-12 11:22:05'
  }
];

const packages = [
  'Gas Compression Package 1',
  'Flow Control Package A',
  'Monitoring Package 3',
  'Tank Farm Package 2',
  'Pump Control Package 1',
  'Cooling System Package A'
];

const systems = [
  'Gas Compression',
  'Flow Control',
  'Pressure Monitoring',
  'Level Monitoring',
  'Temperature Monitoring',
  'Cooling System'
];

const facilities = [
  'North Field',
  'Pipeline Junction B',
  'Central Processing',
  'Tank Farm',
  'Pump Station 2'
];

const assetTags = [
  'COMP-001',
  'FCV-201',
  'PT-305',
  'TK-LVL-004',
  'TEMP-007',
  'CT-FAN-003'
];

const statuses = [
  'Active',
  'Inactive',
  'Maintenance'
];

const RMSAssetListPage: React.FC = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(initialAssets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    assetNo: '',
    assetName: '',
    package: '',
    system: '',
    facility: '',
    assetTag: '',
    model: '',
    status: 'Active',
    sceCode: '',
    criticalityCode: 'C3',
    healthStatus: 'Good',
    lastSync: new Date().toISOString().slice(0, 19).replace('T', ' ')
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    const now = new Date();
    setFormData({
      id: `${assets.length + 1}`,
      assetNo: `RMS-A${String(assets.length + 1).padStart(3, '0')}`,
      assetName: '',
      package: packages[0],
      system: systems[0],
      facility: facilities[0],
      assetTag: '',
      model: '',
      status: 'Active',
      sceCode: '',
      criticalityCode: 'C3',
      healthStatus: 'Good',
      lastSync: now.toISOString().slice(0, 19).replace('T', ' ')
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

  const handleDelete = async (row: any) => {
    setAssets(prev => prev.filter(item => item.id !== row.id));
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

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (!query) {
      setAssets(initialAssets);
      return;
    }
    
    const filtered = initialAssets.filter(asset => 
      asset.assetNo.toLowerCase().includes(query.toLowerCase()) ||
      asset.assetName.toLowerCase().includes(query.toLowerCase()) ||
      asset.package.toLowerCase().includes(query.toLowerCase()) ||
      asset.system.toLowerCase().includes(query.toLowerCase()) ||
      asset.facility.toLowerCase().includes(query.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(query.toLowerCase()) ||
      asset.model.toLowerCase().includes(query.toLowerCase()) ||
      asset.status.toLowerCase().includes(query.toLowerCase()) ||
      asset.sceCode.toLowerCase().includes(query.toLowerCase()) ||
      asset.criticalityCode.toLowerCase().includes(query.toLowerCase()) ||
      asset.healthStatus.toLowerCase().includes(query.toLowerCase())
    );
    
    setAssets(filtered);
  };

  const handleRowClick = (row: any) => {
    navigate(`/monitor/rms-asset-detail/${row.id}`);
  };

  const handleExport = () => {
    // Mock export functionality
    alert("Export functionality will be implemented here");
  };

  const columns: Column[] = [
    { id: 'assetNo', header: 'Asset No', accessorKey: 'assetNo' },
    { id: 'assetName', header: 'Asset Name', accessorKey: 'assetName' },
    { id: 'package', header: 'Package', accessorKey: 'package' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { id: 'facility', header: 'Facility', accessorKey: 'facility' },
    { id: 'assetTag', header: 'Asset Tag', accessorKey: 'assetTag' },
    { id: 'model', header: 'Model', accessorKey: 'model' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
    { id: 'sceCode', header: 'SCE Code', accessorKey: 'sceCode' },
    { id: 'criticalityCode', header: 'Criticality Code', accessorKey: 'criticalityCode' },
    { 
      id: 'healthStatus', 
      header: 'Health Status', 
      accessorKey: 'healthStatus',
      cell: (value) => <StatusBadge status={value} />
    },
    { 
      id: 'lastSync', 
      header: 'Last Sync', 
      accessorKey: 'lastSync',
      cell: (value) => formatDateTime(value)
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="RMS Asset List" 
        subtitle="Remote monitoring system assets"
        icon={<HardDrive className="h-6 w-6" />}
      />

      <TableFilters 
        onSearch={handleSearch}
        onAddNew={handleAddNew}
        addNewLabel="+ Add Asset"
        placeholder="Search assets..."
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={assets}
            onEdit={handleEdit}
            onRowClick={handleRowClick}
            onDelete={handleDelete}
            onExport={handleExport}
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
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {packages.map(pkg => (
                    <option key={pkg} value={pkg}>{pkg}</option>
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
                <Label htmlFor="facility">Facility</Label>
                <select
                  id="facility"
                  name="facility"
                  value={formData.facility}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {facilities.map(facility => (
                    <option key={facility} value={facility}>{facility}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assetTag">Asset Tag</Label>
                <Input
                  id="assetTag"
                  name="assetTag"
                  value={formData.assetTag}
                  onChange={handleInputChange}
                  required
                />
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
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sceCode">SCE Code</Label>
                <Input
                  id="sceCode"
                  name="sceCode"
                  value={formData.sceCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="criticalityCode">Criticality Code</Label>
                <select
                  id="criticalityCode"
                  name="criticalityCode"
                  value={formData.criticalityCode}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="C3">C3</option>
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
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? 'Save Changes' : 'Add Asset'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RMSAssetListPage;
