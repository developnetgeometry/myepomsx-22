
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
const initialProjects = [
  {
    id: '1',
    projectCode: 'PRJ001',
    projectName: 'Refinery Upgrade Project',
    client: 'TechOil Solutions',
    startDate: '2025-01-15',
    endDate: '2025-07-30',
    status: 'Active',
    description: 'Major upgrade of refinery equipment and control systems',
  },
  {
    id: '2',
    projectCode: 'PRJ002',
    projectName: 'Pipeline Integrity Assessment',
    client: 'GlobalEnergy Services',
    startDate: '2025-03-01',
    endDate: '2025-06-15',
    status: 'Active',
    description: 'Comprehensive integrity assessment of transportation pipelines',
  },
  {
    id: '3',
    projectCode: 'PRJ003',
    projectName: 'Offshore Platform Maintenance',
    client: 'Offshore Systems Ltd.',
    startDate: '2025-02-10',
    endDate: '2025-04-10',
    status: 'Completed',
    description: 'Scheduled maintenance of offshore production platform',
  },
  {
    id: '4',
    projectCode: 'PRJ004',
    projectName: 'Control System Upgrade',
    client: 'Industrial Automation Corp.',
    startDate: '2025-05-01',
    endDate: '2025-08-31',
    status: 'Planned',
    description: 'Upgrade of DCS and safety systems to latest version',
  },
  {
    id: '5',
    projectCode: 'PRJ005',
    projectName: 'Equipment Reliability Analysis',
    client: 'PetroMaintain Inc.',
    startDate: '2025-04-15',
    endDate: '2025-07-15',
    status: 'Active',
    description: 'Analysis of critical equipment reliability and improvement recommendations',
  },
];

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    projectCode: '',
    projectName: '',
    client: '',
    startDate: '',
    endDate: '',
    status: 'Planned',
    description: '',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${projects.length + 1}`,
      projectCode: `PRJ${String(projects.length + 1).padStart(3, '0')}`,
      projectName: '',
      client: '',
      startDate: '',
      endDate: '',
      status: 'Planned',
      description: '',
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
      setProjects(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setProjects(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'projectCode', header: 'Project Code', accessorKey: 'projectCode' },
    { id: 'projectName', header: 'Project Name', accessorKey: 'projectName' },
    { id: 'client', header: 'Client', accessorKey: 'client' },
    { id: 'startDate', header: 'Start Date', accessorKey: 'startDate' },
    { id: 'endDate', header: 'End Date', accessorKey: 'endDate' },
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
        title="Project Setup" 
        subtitle="Manage project information and timelines"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Project"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={projects}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              Fill in the project details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectCode">Project Code</Label>
                <Input
                  id="projectCode"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
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
                  <option value="Planned">Planned</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
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

export default ProjectPage;
