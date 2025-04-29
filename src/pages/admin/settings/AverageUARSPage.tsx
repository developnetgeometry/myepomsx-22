
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
const initialUARS = [
  {
    id: '1',
    uarsCode: 'UARS-1',
    description: 'Very Good Condition',
    rating: '1',
    criteria: 'New or like-new condition with no visible defects',
    status: 'Active',
  },
  {
    id: '2',
    uarsCode: 'UARS-2',
    description: 'Good Condition',
    rating: '2',
    criteria: 'Minor wear but fully functional with no repairs needed',
    status: 'Active',
  },
  {
    id: '3',
    uarsCode: 'UARS-3',
    description: 'Fair Condition',
    rating: '3',
    criteria: 'Moderate wear with minor repairs needed in the near future',
    status: 'Active',
  },
  {
    id: '4',
    uarsCode: 'UARS-4',
    description: 'Poor Condition',
    rating: '4',
    criteria: 'Significant wear with immediate repairs required',
    status: 'Active',
  },
  {
    id: '5',
    uarsCode: 'UARS-5',
    description: 'Very Poor Condition',
    rating: '5',
    criteria: 'Severe deterioration requiring replacement or major overhaul',
    status: 'Active',
  },
];

const AverageUARSPage: React.FC = () => {
  const [uarsData, setUarsData] = useState(initialUARS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    uarsCode: '',
    description: '',
    rating: '',
    criteria: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${uarsData.length + 1}`,
      uarsCode: `UARS-${uarsData.length + 1}`,
      description: '',
      rating: '',
      criteria: '',
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
      setUarsData(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setUarsData(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'uarsCode', header: 'UARS Code', accessorKey: 'uarsCode' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'rating', header: 'Rating', accessorKey: 'rating' },
    { id: 'criteria', header: 'Criteria', accessorKey: 'criteria' },
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
        title="Average UARS Settings" 
        subtitle="Configure Unit Asset Rating System for condition assessment"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New UARS Rating"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={uarsData}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit UARS Rating' : 'Add New UARS Rating'}
            </DialogTitle>
            <DialogDescription>
              Fill in the UARS rating details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uarsCode">UARS Code</Label>
                <Input
                  id="uarsCode"
                  name="uarsCode"
                  value={formData.uarsCode}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  max="5"
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
                <Label htmlFor="criteria">Criteria</Label>
                <Textarea
                  id="criteria"
                  name="criteria"
                  value={formData.criteria}
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

export default AverageUARSPage;
