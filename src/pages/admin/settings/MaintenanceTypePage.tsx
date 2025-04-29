
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
const initialMaintenanceTypes = [
  {
    id: '1',
    typeId: 'PM',
    maintenanceType: 'Preventive Maintenance',
    applicableScope: 'All Equipment',
    description: 'Regular, scheduled maintenance to prevent failures',
    status: 'Active',
  },
  {
    id: '2',
    typeId: 'CM',
    maintenanceType: 'Corrective Maintenance',
    applicableScope: 'All Equipment',
    description: 'Maintenance performed to correct a failure or defect',
    status: 'Active',
  },
  {
    id: '3',
    typeId: 'PdM',
    maintenanceType: 'Predictive Maintenance',
    applicableScope: 'Critical Equipment',
    description: 'Condition-based maintenance based on monitoring',
    status: 'Active',
  },
  {
    id: '4',
    typeId: 'EM',
    maintenanceType: 'Emergency Maintenance',
    applicableScope: 'All Equipment',
    description: 'Urgent maintenance to prevent severe consequences',
    status: 'Active',
  },
  {
    id: '5',
    typeId: 'OH',
    maintenanceType: 'Overhaul',
    applicableScope: 'Major Equipment',
    description: 'Complete disassembly and examination of equipment',
    status: 'Inactive',
  },
];

const MaintenanceTypePage: React.FC = () => {
  const [maintenanceTypes, setMaintenanceTypes] = useState(initialMaintenanceTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    typeId: '',
    maintenanceType: '',
    applicableScope: '',
    description: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${maintenanceTypes.length + 1}`,
      typeId: '',
      maintenanceType: '',
      applicableScope: '',
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
      setMaintenanceTypes(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setMaintenanceTypes(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'typeId', header: 'Type ID', accessorKey: 'typeId' },
    { id: 'maintenanceType', header: 'Maintenance Type', accessorKey: 'maintenanceType' },
    { id: 'applicableScope', header: 'Applicable Scope', accessorKey: 'applicableScope' },
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
        title="Maintenance Type Settings" 
        subtitle="Configure maintenance types for work orders and tasks"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Maintenance Type"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={maintenanceTypes}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Maintenance Type' : 'Add New Maintenance Type'}
            </DialogTitle>
            <DialogDescription>
              Fill in the maintenance type details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="typeId">Type ID</Label>
                <Input
                  id="typeId"
                  name="typeId"
                  value={formData.typeId}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., PM, CM, PdM"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maintenanceType">Maintenance Type</Label>
                <Input
                  id="maintenanceType"
                  name="maintenanceType"
                  value={formData.maintenanceType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="applicableScope">Applicable Scope</Label>
                <Input
                  id="applicableScope"
                  name="applicableScope"
                  value={formData.applicableScope}
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

export default MaintenanceTypePage;
