
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample data
const initialWorkRequests = [
  {
    id: 'WR-2023-0001',
    noWorkRequest: 'WR-2023-0001',
    description: 'Compressor vibration issue',
    status: 'Pending',
    requestedBy: 'John Doe',
    workCenter: 'Mechanical',
    workOrderNo: 'WO-2023-0100',
    woStatus: 'Open',
    asset: 'COMP-101',
    requestDate: '2023-07-15',
    workType: 'Corrective',
    dateFinding: '2023-07-13',
  },
  {
    id: 'WR-2023-0002',
    noWorkRequest: 'WR-2023-0002',
    description: 'Pressure relief valve replacement',
    status: 'Approved',
    requestedBy: 'Jane Smith',
    workCenter: 'Instrumentation',
    workOrderNo: 'WO-2023-0101',
    woStatus: 'In Progress',
    asset: 'PRV-203',
    requestDate: '2023-07-16',
    workType: 'Preventive',
    dateFinding: '2023-07-14',
  },
  {
    id: 'WR-2023-0003',
    noWorkRequest: 'WR-2023-0003',
    description: 'Motor bearing noise',
    status: 'Completed',
    requestedBy: 'Mike Johnson',
    workCenter: 'Electrical',
    workOrderNo: 'WO-2023-0102',
    woStatus: 'Closed',
    asset: 'MTR-304',
    requestDate: '2023-07-18',
    workType: 'Corrective',
    dateFinding: '2023-07-17',
  },
  {
    id: 'WR-2023-0004',
    noWorkRequest: 'WR-2023-0004',
    description: 'Cooling tower fan alignment',
    status: 'Rejected',
    requestedBy: 'Sarah Williams',
    workCenter: 'Mechanical',
    workOrderNo: '',
    woStatus: '',
    asset: 'CT-405',
    requestDate: '2023-07-19',
    workType: 'Corrective',
    dateFinding: '2023-07-18',
  },
  {
    id: 'WR-2023-0005',
    noWorkRequest: 'WR-2023-0005',
    description: 'Flow meter calibration',
    status: 'Pending',
    requestedBy: 'Robert Brown',
    workCenter: 'Instrumentation',
    workOrderNo: '',
    woStatus: '',
    asset: 'FMT-506',
    requestDate: '2023-07-20',
    workType: 'Calibration',
    dateFinding: '2023-07-19',
  },
  {
    id: 'WR-2023-0006',
    noWorkRequest: 'WR-2023-0006',
    description: 'Control valve leaking',
    status: 'Approved',
    requestedBy: 'Emily Davis',
    workCenter: 'Piping',
    workOrderNo: 'WO-2023-0103',
    woStatus: 'Open',
    asset: 'CV-607',
    requestDate: '2023-07-21',
    workType: 'Corrective',
    dateFinding: '2023-07-20',
  },
  {
    id: 'WR-2023-0007',
    noWorkRequest: 'WR-2023-0007',
    description: 'Pump seal replacement',
    status: 'In Progress',
    requestedBy: 'Alex Johnson',
    workCenter: 'Mechanical',
    workOrderNo: 'WO-2023-0104',
    woStatus: 'In Progress',
    asset: 'PMP-708',
    requestDate: '2023-07-22',
    workType: 'Corrective',
    dateFinding: '2023-07-21',
  },
];

const WorkRequestPage: React.FC = () => {
  const [workRequests, setWorkRequests] = useState(initialWorkRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    noWorkRequest: '',
    description: '',
    status: 'Pending',
    requestedBy: '',
    workCenter: '',
    workOrderNo: '',
    woStatus: '',
    asset: '',
    requestDate: '',
    workType: 'Corrective',
    dateFinding: '',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `WR-2023-${String(workRequests.length + 1).padStart(4, '0')}`,
      noWorkRequest: `WR-2023-${String(workRequests.length + 1).padStart(4, '0')}`,
      description: '',
      status: 'Pending',
      requestedBy: '',
      workCenter: '',
      workOrderNo: '',
      woStatus: '',
      asset: '',
      requestDate: new Date().toISOString().split('T')[0],
      workType: 'Corrective',
      dateFinding: new Date().toISOString().split('T')[0],
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setWorkRequests(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setWorkRequests(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'noWorkRequest', header: 'Work Request No', accessorKey: 'noWorkRequest' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
    { id: 'requestedBy', header: 'Requested By', accessorKey: 'requestedBy' },
    { id: 'workCenter', header: 'Work Center', accessorKey: 'workCenter' },
    { id: 'workOrderNo', header: 'Work Order No', accessorKey: 'workOrderNo' },
    { 
      id: 'woStatus', 
      header: 'WO Status', 
      accessorKey: 'woStatus',
      cell: (value) => value ? <StatusBadge status={value} /> : '-'
    },
    { id: 'asset', header: 'Asset', accessorKey: 'asset' },
    { id: 'requestDate', header: 'Request Date', accessorKey: 'requestDate' },
    { id: 'workType', header: 'Work Type', accessorKey: 'workType' },
    { id: 'dateFinding', header: 'Date Finding', accessorKey: 'dateFinding' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Work Request" 
        onAddNew={handleAddNew}
        addNewLabel="+ New Work Request"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={workRequests}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Work Request' : 'Create New Work Request'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the work request. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="noWorkRequest">Work Request No</Label>
                <Input
                  id="noWorkRequest"
                  name="noWorkRequest"
                  value={formData.noWorkRequest}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="asset">Asset</Label>
                <Input
                  id="asset"
                  name="asset"
                  value={formData.asset}
                  onChange={handleInputChange}
                  placeholder="Enter asset ID"
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
                  placeholder="Enter work request description"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requestedBy">Requested By</Label>
                <Input
                  id="requestedBy"
                  name="requestedBy"
                  value={formData.requestedBy}
                  onChange={handleInputChange}
                  placeholder="Enter requester name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workCenter">Work Center</Label>
                <Select
                  name="workCenter"
                  value={formData.workCenter}
                  onValueChange={(value) => handleSelectChange('workCenter', value)}
                >
                  <SelectTrigger id="workCenter">
                    <SelectValue placeholder="Select work center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Instrumentation">Instrumentation</SelectItem>
                    <SelectItem value="Piping">Piping</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workType">Work Type</Label>
                <Select
                  name="workType"
                  value={formData.workType}
                  onValueChange={(value) => handleSelectChange('workType', value)}
                >
                  <SelectTrigger id="workType">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corrective">Corrective</SelectItem>
                    <SelectItem value="Preventive">Preventive</SelectItem>
                    <SelectItem value="Calibration">Calibration</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Modification">Modification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requestDate">Request Date</Label>
                <Input
                  id="requestDate"
                  name="requestDate"
                  type="date"
                  value={formData.requestDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFinding">Date Finding</Label>
                <Input
                  id="dateFinding"
                  name="dateFinding"
                  type="date"
                  value={formData.dateFinding}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {isEditMode && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="workOrderNo">Work Order No</Label>
                    <Input
                      id="workOrderNo"
                      name="workOrderNo"
                      value={formData.workOrderNo}
                      onChange={handleInputChange}
                      placeholder="Enter work order number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="woStatus">WO Status</Label>
                    <Select
                      name="woStatus"
                      value={formData.woStatus}
                      onValueChange={(value) => handleSelectChange('woStatus', value)}
                    >
                      <SelectTrigger id="woStatus">
                        <SelectValue placeholder="Select work order status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Not Assigned</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
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

export default WorkRequestPage;
