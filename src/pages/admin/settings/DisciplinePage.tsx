
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

// Sample data
const initialDisciplines = [
  {
    id: '1',
    disciplineCode: 'MECH',
    disciplineName: 'Mechanical',
    description: 'Deals with mechanical equipment and components',
    status: 'Active',
    colorCode: '#4CAF50',
  },
  {
    id: '2',
    disciplineCode: 'ELEC',
    disciplineName: 'Electrical',
    description: 'Deals with electrical systems and components',
    status: 'Active',
    colorCode: '#2196F3',
  },
  {
    id: '3',
    disciplineCode: 'INST',
    disciplineName: 'Instrumentation',
    description: 'Deals with measurement and control instruments',
    status: 'Active',
    colorCode: '#9C27B0',
  },
  {
    id: '4',
    disciplineCode: 'HVAC',
    disciplineName: 'HVAC',
    description: 'Heating, ventilation, and air conditioning systems',
    status: 'Active',
    colorCode: '#FF9800',
  },
  {
    id: '5',
    disciplineCode: 'PIPE',
    disciplineName: 'Piping',
    description: 'Deals with piping systems and components',
    status: 'Active',
    colorCode: '#F44336',
  },
  {
    id: '6',
    disciplineCode: 'CIVIL',
    disciplineName: 'Civil',
    description: 'Deals with structural and civil engineering aspects',
    status: 'Inactive',
    colorCode: '#795548',
  },
];

const DisciplinePage: React.FC = () => {
  const [disciplines, setDisciplines] = useState(initialDisciplines);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    disciplineCode: '',
    disciplineName: '',
    description: '',
    status: 'Active',
    colorCode: '#000000',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${disciplines.length + 1}`,
      disciplineCode: '',
      disciplineName: '',
      description: '',
      status: 'Active',
      colorCode: '#000000',
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
      setDisciplines(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setDisciplines(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { 
      id: 'disciplineCode', 
      header: 'Code', 
      accessorKey: 'disciplineCode',
    },
    { id: 'disciplineName', header: 'Discipline Name', accessorKey: 'disciplineName' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    {
      id: 'colorCode',
      header: 'Color',
      accessorKey: 'colorCode',
      cell: (value) => (
        <div className="flex items-center">
          <div 
            className="w-6 h-6 rounded-full mr-2" 
            style={{ backgroundColor: value }}
          />
          <span>{value}</span>
        </div>
      ),
    },
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
        title="Discipline Settings" 
        onAddNew={handleAddNew}
        addNewLabel="+ New Discipline"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={disciplines}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Discipline' : 'Add New Discipline'}
            </DialogTitle>
            <DialogDescription>
              Fill in the discipline details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="disciplineCode">Discipline Code</Label>
                <Input
                  id="disciplineCode"
                  name="disciplineCode"
                  value={formData.disciplineCode}
                  onChange={handleInputChange}
                  required
                  maxLength={6}
                  placeholder="e.g., MECH, ELEC"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a short code (max 6 characters)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="disciplineName">Discipline Name</Label>
                <Input
                  id="disciplineName"
                  name="disciplineName"
                  value={formData.disciplineName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="colorCode">Color Code</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="colorCode"
                    name="colorCode"
                    type="color"
                    value={formData.colorCode}
                    onChange={handleInputChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={formData.colorCode}
                    onChange={handleInputChange}
                    name="colorCode"
                    className="flex-1"
                  />
                </div>
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

export default DisciplinePage;
