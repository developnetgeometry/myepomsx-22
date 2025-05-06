import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Building } from 'lucide-react';

// Sample data
const initialCompanies = [
  {
    id: '1',
    companyId: 'COMP001',
    companyName: 'TechOil Solutions',
    address: '123 Energy Park, Houston, TX 77001',
    contactPerson: 'John Smith',
    email: 'john.smith@techoil.com',
    phone: '(713) 555-1234',
    status: 'Active',
  },
  {
    id: '2',
    companyId: 'COMP002',
    companyName: 'PetroMaintain Inc.',
    address: '456 Industry Blvd, Austin, TX 78701',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@petromaintain.com',
    phone: '(512) 555-6789',
    status: 'Active',
  },
  {
    id: '3',
    companyId: 'COMP003',
    companyName: 'GlobalEnergy Services',
    address: '789 Refinery Road, Dallas, TX 75201',
    contactPerson: 'Michael Brown',
    email: 'michael.brown@globalenergy.com',
    phone: '(214) 555-9012',
    status: 'Active',
  },
  {
    id: '4',
    companyId: 'COMP004',
    companyName: 'Offshore Systems Ltd.',
    address: '101 Marine Way, New Orleans, LA 70112',
    contactPerson: 'Emily Wilson',
    email: 'emily.wilson@offshoresystems.com',
    phone: '(504) 555-3456',
    status: 'Inactive',
  },
  {
    id: '5',
    companyId: 'COMP005',
    companyName: 'Industrial Automation Corp.',
    address: '202 Tech Center, San Antonio, TX 78205',
    contactPerson: 'David Lee',
    email: 'david.lee@industrialauto.com',
    phone: '(210) 555-7890',
    status: 'Active',
  },
];

const CompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(initialCompanies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    companyId: '',
    companyName: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${companies.length + 1}`,
      companyId: `COMP${String(companies.length + 1).padStart(3, '0')}`,
      companyName: '',
      address: '',
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

  const handleRowClick = (row: any) => {
    navigate(`/admin/setup/company/${row.id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setCompanies(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setCompanies(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'companyId', header: 'Company ID', accessorKey: 'companyId' },
    { id: 'companyName', header: 'Company Name', accessorKey: 'companyName' },
    { id: 'contactPerson', header: 'Contact Person', accessorKey: 'contactPerson' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
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
        title="Company Setup" 
        subtitle="Manage company information and contact details"
        icon={<Building className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Company"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={companies}
        onEdit={handleEdit}
        onRowClick={handleRowClick}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Company' : 'Add New Company'}
            </DialogTitle>
            <DialogDescription>
              Fill in the company details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyId">Company ID</Label>
                <Input
                  id="companyId"
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
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
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
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

export default CompanyPage;
