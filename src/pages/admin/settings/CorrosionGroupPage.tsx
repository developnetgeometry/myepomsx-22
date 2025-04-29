
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
const initialCorrosionGroups = [
  {
    id: '1',
    groupId: 'CG001',
    groupName: 'General Corrosion',
    description: 'Uniform loss of material across the surface',
    severity: 'Medium',
    status: 'Active',
  },
  {
    id: '2',
    groupId: 'CG002',
    groupName: 'Pitting Corrosion',
    description: 'Localized cavities or holes in the material',
    severity: 'High',
    status: 'Active',
  },
  {
    id: '3',
    groupId: 'CG003',
    groupName: 'Stress Corrosion Cracking',
    description: 'Cracking induced by combined stress and corrosive environment',
    severity: 'Critical',
    status: 'Active',
  },
  {
    id: '4',
    groupId: 'CG004',
    groupName: 'Galvanic Corrosion',
    description: 'Corrosion due to electrical contact between dissimilar metals',
    severity: 'Medium',
    status: 'Active',
  },
  {
    id: '5',
    groupId: 'CG005',
    groupName: 'Erosion Corrosion',
    description: 'Material degradation due to combined erosion and corrosion',
    severity: 'High',
    status: 'Inactive',
  },
];

const CorrosionGroupPage: React.FC = () => {
  const [corrosionGroups, setCorrosionGroups] = useState(initialCorrosionGroups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    groupId: '',
    groupName: '',
    description: '',
    severity: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${corrosionGroups.length + 1}`,
      groupId: `CG${String(corrosionGroups.length + 1).padStart(3, '0')}`,
      groupName: '',
      description: '',
      severity: '',
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
      setCorrosionGroups(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setCorrosionGroups(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'groupId', header: 'Group ID', accessorKey: 'groupId' },
    { id: 'groupName', header: 'Group Name', accessorKey: 'groupName' },
    { id: 'severity', header: 'Severity', accessorKey: 'severity' },
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
        title="Corrosion Group Settings" 
        subtitle="Manage corrosion groups for integrity monitoring"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Corrosion Group"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={corrosionGroups}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Corrosion Group' : 'Add New Corrosion Group'}
            </DialogTitle>
            <DialogDescription>
              Fill in the corrosion group details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groupId">Group ID</Label>
                <Input
                  id="groupId"
                  name="groupId"
                  value={formData.groupId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select severity level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
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

export default CorrosionGroupPage;
