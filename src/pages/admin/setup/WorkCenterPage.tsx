import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import StatusBadge from '@/components/shared/StatusBadge';
import { Building } from 'lucide-react';

// Sample work center data
const initialWorkCenters = [
  {
    id: '1',
    workCenterId: 'WC001',
    name: 'Mechanical Workshop',
    department: 'Engineering',
    area: 'Building A',
    contactPerson: 'John Smith',
    email: 'john.smith@example.com',
    phone: '123-456-7890',
    status: 'Active',
  },
  {
    id: '2',
    workCenterId: 'WC002',
    name: 'Electrical Lab',
    department: 'Engineering',
    area: 'Building B',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '234-567-8901',
    status: 'Active',
  },
  {
    id: '3',
    workCenterId: 'WC003',
    name: 'Control Systems',
    department: 'Operations',
    area: 'Building C',
    contactPerson: 'David Lee',
    email: 'david.lee@example.com',
    phone: '345-678-9012',
    status: 'Active',
  },
  {
    id: '4',
    workCenterId: 'WC004',
    name: 'Maintenance Shop',
    department: 'Maintenance',
    area: 'Building D',
    contactPerson: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '456-789-0123',
    status: 'Inactive',
  },
  {
    id: '5',
    workCenterId: 'WC005',
    name: 'Instrument Calibration',
    department: 'Quality Control',
    area: 'Building A',
    contactPerson: 'Robert Chen',
    email: 'robert.chen@example.com',
    phone: '567-890-1234',
    status: 'Active',
  },
];

const WorkCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [workCenters, setWorkCenters] = useState(initialWorkCenters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    workCenterId: '',
    name: '',
    department: '',
    area: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${workCenters.length + 1}`,
      workCenterId: `WC${String(workCenters.length + 1).padStart(3, '0')}`,
      name: '',
      department: '',
      area: '',
      contactPerson: '',
      email: '',
      phone: '',
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
      setWorkCenters(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setWorkCenters(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const handleRowClick = (row: any) => {
    navigate(`/admin/setup/work-center/${row.id}`);
  };

  const columns: Column[] = [
    { id: 'workCenterId', header: 'Work Center ID', accessorKey: 'workCenterId' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'department', header: 'Department', accessorKey: 'department' },
    { id: 'area', header: 'Area', accessorKey: 'area' },
    { id: 'contactPerson', header: 'Contact Person', accessorKey: 'contactPerson' },
    { id: 'phone', header: 'Phone', accessorKey: 'phone' },
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
        title="Work Center Setup" 
        subtitle="Manage work centers for different departments and areas"
        icon={<Building className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Work Center"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={workCenters}
        onEdit={handleEdit}
        onRowClick={handleRowClick}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Work Center' : 'Add New Work Center'}
            </DialogTitle>
            <DialogDescription>
              Fill in the work center details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workCenterId">Work Center ID</Label>
                <Input
                  id="workCenterId"
                  name="workCenterId"
                  value={formData.workCenterId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Work Center Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
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

export default WorkCenterPage;
