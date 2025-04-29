
import React, { useState } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from '@/components/shared/StatusBadge';
import { PackageIcon } from 'lucide-react';

// Sample data for inventory groups
const initialGroups = [
  { 
    id: '1',
    groupId: 'GRP-001',
    groupName: 'Pressure Vessels',
    itemsCount: 24,
    category: 'Static Equipment',
    status: 'Active'
  },
  { 
    id: '2',
    groupId: 'GRP-002',
    groupName: 'Heat Exchangers',
    itemsCount: 18,
    category: 'Static Equipment',
    status: 'Active'
  },
  { 
    id: '3',
    groupId: 'GRP-003',
    groupName: 'Pumps',
    itemsCount: 32,
    category: 'Rotating Equipment',
    status: 'Active'
  },
  { 
    id: '4',
    groupId: 'GRP-004',
    groupName: 'Compressors',
    itemsCount: 12,
    category: 'Rotating Equipment',
    status: 'Active'
  },
  { 
    id: '5',
    groupId: 'GRP-005',
    groupName: 'Piping',
    itemsCount: 156,
    category: 'Static Equipment',
    status: 'Active'
  },
  { 
    id: '6',
    groupId: 'GRP-006',
    groupName: 'Instruments',
    itemsCount: 87,
    category: 'Instrumentation',
    status: 'Active'
  },
  { 
    id: '7',
    groupId: 'GRP-007',
    groupName: 'Electrical Equipment',
    itemsCount: 45,
    category: 'Electrical',
    status: 'Inactive'
  },
  { 
    id: '8',
    groupId: 'GRP-008',
    groupName: 'HVAC',
    itemsCount: 23,
    category: 'Utilities',
    status: 'Active'
  },
];

// Categories for dropdown
const categories = [
  'Static Equipment',
  'Rotating Equipment',
  'Instrumentation',
  'Electrical',
  'Utilities',
  'Safety Systems'
];

const InventoryGroupsPage: React.FC = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    groupId: '',
    groupName: '',
    itemsCount: 0,
    category: '',
    status: 'Active'
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${groups.length + 1}`,
      groupId: `GRP-${String(groups.length + 1).padStart(3, '0')}`,
      groupName: '',
      itemsCount: 0,
      category: categories[0],
      status: 'Active'
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
    if (name === 'itemsCount') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setGroups(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setGroups(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'groupId', header: 'Group ID', accessorKey: 'groupId' },
    { id: 'groupName', header: 'Group Name', accessorKey: 'groupName' },
    { 
      id: 'itemsCount', 
      header: 'Items Count', 
      accessorKey: 'itemsCount',
      cell: (value) => (
        <span className="font-semibold">{value}</span>
      )
    },
    { id: 'category', header: 'Category', accessorKey: 'category' },
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
        title="Inventory Groups"
        subtitle="Management of equipment inventory groups"
        icon={<PackageIcon className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Group"
        onSearch={(query) => console.log('Search:', query)}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={groups}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Inventory Group' : 'Add New Inventory Group'}
            </DialogTitle>
            <DialogDescription>
              Fill in the group details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="itemsCount">Items Count</Label>
                <Input
                  id="itemsCount"
                  name="itemsCount"
                  type="number"
                  min="0"
                  value={formData.itemsCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
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

export default InventoryGroupsPage;
