
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/shared/StatusBadge';
import { Database } from 'lucide-react';

// Sample data
const initialAssetClasses = [
  {
    id: '1',
    classId: 'AC001',
    className: 'Rotating Equipment',
    assetType: 'Mechanical',
    description: 'Motors, pumps, turbines, and other rotating machinery',
    status: 'Active',
  },
  {
    id: '2',
    classId: 'AC002',
    className: 'Pressure Vessels',
    assetType: 'Static',
    description: 'Storage tanks, reactors, and other pressure vessels',
    status: 'Active',
  },
  {
    id: '3',
    classId: 'AC003',
    className: 'Piping Systems',
    assetType: 'Static',
    description: 'Pipes, valves, fittings for fluid transport',
    status: 'Active',
  },
  {
    id: '4',
    classId: 'AC004',
    className: 'Electrical Equipment',
    assetType: 'Electrical',
    description: 'Switchgear, transformers, and distribution equipment',
    status: 'Inactive',
  },
  {
    id: '5',
    classId: 'AC005',
    className: 'Control Systems',
    assetType: 'Instrumentation',
    description: 'Control systems, sensors, and monitoring equipment',
    status: 'Active',
  },
];

const AssetClassPage: React.FC = () => {
  const [assetClasses, setAssetClasses] = useState(initialAssetClasses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    classId: '',
    className: '',
    assetType: '',
    description: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${assetClasses.length + 1}`,
      classId: `AC${String(assetClasses.length + 1).padStart(3, '0')}`,
      className: '',
      assetType: '',
      description: '',
      status: 'Active',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setAssetClasses(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setAssetClasses(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'classId', header: 'Class ID', accessorKey: 'classId' },
    { id: 'className', header: 'Class Name', accessorKey: 'className' },
    { id: 'assetType', header: 'Asset Type', accessorKey: 'assetType' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
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
        title="Asset Class Settings" 
        subtitle="Manage asset classes for equipment categorization"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Asset Class"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={assetClasses}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Asset Class' : 'Add New Asset Class'}
            </DialogTitle>
            <DialogDescription>
              Fill in the asset class details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="classId">Class ID</Label>
                <Input
                  id="classId"
                  name="classId"
                  value={formData.classId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type</Label>
                <select
                  id="assetType"
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select an asset type</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Instrumentation">Instrumentation</option>
                  <option value="Civil">Civil</option>
                  <option value="Static">Static</option>
                  <option value="Other">Other</option>
                </select>
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
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

export default AssetClassPage;
