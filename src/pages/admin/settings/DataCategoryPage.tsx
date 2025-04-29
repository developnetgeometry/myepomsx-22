
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
const initialDataCategories = [
  {
    id: '1',
    categoryId: 'DC001',
    name: 'Process Data',
    description: 'Data related to process parameters and control systems',
    status: 'Active',
  },
  {
    id: '2',
    categoryId: 'DC002',
    name: 'Equipment Data',
    description: 'Data related to equipment health and performance',
    status: 'Active',
  },
  {
    id: '3',
    categoryId: 'DC003',
    name: 'Maintenance Data',
    description: 'Data related to maintenance activities and history',
    status: 'Active',
  },
  {
    id: '4',
    categoryId: 'DC004',
    name: 'Safety Data',
    description: 'Data related to safety incidents and compliance',
    status: 'Active',
  },
  {
    id: '5',
    categoryId: 'DC005',
    name: 'Environmental Data',
    description: 'Data related to environmental monitoring and compliance',
    status: 'Inactive',
  },
];

const DataCategoryPage: React.FC = () => {
  const [dataCategories, setDataCategories] = useState(initialDataCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    categoryId: '',
    name: '',
    description: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${dataCategories.length + 1}`,
      categoryId: `DC${String(dataCategories.length + 1).padStart(3, '0')}`,
      name: '',
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setDataCategories(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setDataCategories(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'categoryId', header: 'Category ID', accessorKey: 'categoryId' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
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
        title="Data Category Settings"
        subtitle="Manage data categories for classification and organization" 
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Data Category"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={dataCategories}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Data Category' : 'Add New Data Category'}
            </DialogTitle>
            <DialogDescription>
              Fill in the data category details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category ID</Label>
                <Input
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
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

export default DataCategoryPage;
