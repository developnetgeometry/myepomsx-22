
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import { toast } from 'sonner';
import ManageDialog from '@/components/manage/ManageDialog';
import * as z from 'zod';

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

const formSchema = z.object({
  noWorkRequest: z.string(),
  status: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requestDate: z.string(),
  targetDueDate: z.string().optional(),
  facilityLocation: z.string().optional(),
  system: z.string().optional(),
  package: z.string().optional(),
  asset: z.string(),
  assetSCECode: z.string().optional(),
  workCenter: z.string(),
  dateFinding: z.string(),
  maintenanceType: z.string(),
  requestType: z.string().optional(),
  requestedBy: z.string(),
  criticality: z.string().optional(),
  findingDetails: z.string().optional(),
});

const WorkRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [workRequests, setWorkRequests] = useState(initialWorkRequests);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    noWorkRequest: '',
    description: '',
    status: 'Draft',
    requestedBy: 'John Doe',
    workCenter: '',
    workOrderNo: '',
    woStatus: '',
    asset: '',
    requestDate: new Date().toISOString().split('T')[0],
    targetDueDate: '',
    facilityLocation: '',
    system: '',
    package: '',
    assetSCECode: '',
    dateFinding: new Date().toISOString().split('T')[0],
    maintenanceType: 'Corrective',
    requestType: 'Finding',
    criticality: 'Medium',
    findingDetails: '',
    attachReport: false,
    childIncidentReport: false,
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `WR-2023-${String(workRequests.length + 1).padStart(4, '0')}`,
      noWorkRequest: `WR-2023-${String(workRequests.length + 1).padStart(4, '0')}`,
      description: '',
      status: 'Draft',
      requestedBy: 'John Doe',
      workCenter: '',
      workOrderNo: '',
      woStatus: '',
      asset: '',
      requestDate: new Date().toISOString().split('T')[0],
      targetDueDate: '',
      facilityLocation: '',
      system: '',
      package: '',
      assetSCECode: '',
      dateFinding: new Date().toISOString().split('T')[0],
      maintenanceType: 'Corrective',
      requestType: 'Finding',
      criticality: 'Medium',
      findingDetails: '',
      attachReport: false,
      childIncidentReport: false,
    });
    setIsManageDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setFormData({
      ...row
    });
    setIsManageDialogOpen(true);
  };

  const handleSubmit = (values: any) => {
    if (isEditMode) {
      setWorkRequests(prev => 
        prev.map(item => item.id === values.id ? { ...values } : item)
      );
      toast.success("Work request updated successfully");
    } else {
      setWorkRequests(prev => [...prev, values]);
      toast.success("Work request created successfully");
    }
    
    setIsManageDialogOpen(false);
  };

  const handleRowClick = (row: any) => {
    navigate(`/maintain/work-request/${row.id}`);
  };

  const formFields = [
    {
      name: "noWorkRequest", 
      label: "Work Request No", 
      type: "text" as const,
      required: true,
      placeholder: "Auto-generated",
      section: "main" as const,
    },
    {
      name: "status", 
      label: "Status", 
      type: "select" as const,
      required: true,
      options: [
        { value: "Draft", label: "Draft" },
        { value: "Submitted", label: "Submitted" },
        { value: "Pending", label: "Pending" },
        { value: "Approved", label: "Approved" },
        { value: "Rejected", label: "Rejected" },
      ],
      section: "main" as const,
    },
    {
      name: "description", 
      label: "Description", 
      type: "textarea" as const,
      required: true,
      placeholder: "Describe the issue or request in detail",
      section: "main" as const,
      richText: true,
    },
    {
      name: "requestDate", 
      label: "Work Request Date", 
      type: "date" as const,
      required: true,
      section: "dates" as const,
    },
    {
      name: "targetDueDate", 
      label: "Target Due Date", 
      type: "date" as const,
      section: "dates" as const,
    },
    {
      name: "facilityLocation", 
      label: "Facility", 
      type: "select" as const,
      options: [
        { value: "Central Processing", label: "Central Processing" },
        { value: "North Field", label: "North Field" },
        { value: "South Field", label: "South Field" },
        { value: "Terminal", label: "Terminal" },
      ],
      section: "dates" as const,
    },
    {
      name: "system", 
      label: "System", 
      type: "select" as const,
      options: [
        { value: "Production", label: "Production" },
        { value: "Compression", label: "Compression" },
        { value: "Separation", label: "Separation" },
        { value: "Treatment", label: "Treatment" },
      ],
      section: "dates" as const,
    },
    {
      name: "package", 
      label: "Package", 
      type: "select" as const,
      options: [
        { value: "V-110 Test Separator", label: "V-110 Test Separator" },
        { value: "P-120 Transfer Pump", label: "P-120 Transfer Pump" },
        { value: "C-130 Compressor", label: "C-130 Compressor" },
        { value: "E-140 Heat Exchanger", label: "E-140 Heat Exchanger" },
      ],
      section: "dates" as const,
    },
    {
      name: "asset", 
      label: "Asset", 
      type: "select" as const,
      required: true,
      options: [
        { value: "V-110", label: "V-110" },
        { value: "P-120", label: "P-120" },
        { value: "C-130", label: "C-130" },
        { value: "E-140", label: "E-140" },
      ],
      section: "dates" as const,
    },
    {
      name: "assetSCECode", 
      label: "Asset SCE Code", 
      type: "text" as const,
      placeholder: "Safety Critical Element code",
      section: "dates" as const,
    },
    {
      name: "workCenter", 
      label: "Work Center", 
      type: "select" as const,
      required: true,
      options: [
        { value: "Mechanical", label: "Mechanical" },
        { value: "Electrical", label: "Electrical" },
        { value: "Instrumentation", label: "Instrumentation" },
        { value: "Piping", label: "Piping" },
        { value: "Civil", label: "Civil" },
      ],
      section: "maintenance" as const,
    },
    {
      name: "dateFinding", 
      label: "Date Finding", 
      type: "date" as const,
      required: true,
      section: "maintenance" as const,
    },
    {
      name: "maintenanceType", 
      label: "Maintenance Type", 
      type: "select" as const,
      required: true,
      options: [
        { value: "Corrective", label: "Corrective (CM)" },
        { value: "Preventive", label: "Preventive (PM)" },
        { value: "Predictive", label: "Predictive (PdM)" },
        { value: "Detective", label: "Detective" },
        { value: "Modification", label: "Modification" },
      ],
      section: "maintenance" as const,
    },
    {
      name: "requestType", 
      label: "Request Type", 
      type: "select" as const,
      options: [
        { value: "Finding", label: "Finding" },
        { value: "Failure", label: "Failure" },
        { value: "Audit", label: "Audit" },
        { value: "Inspection", label: "Inspection" },
      ],
      section: "maintenance" as const,
    },
    {
      name: "requestedBy", 
      label: "Requested By", 
      type: "select" as const,
      required: true,
      options: [
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Mike Johnson", label: "Mike Johnson" },
        { value: "Sarah Williams", label: "Sarah Williams" },
      ],
      section: "maintenance" as const,
    },
    {
      name: "criticality", 
      label: "Criticality", 
      type: "select" as const,
      options: [
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
        { value: "Critical", label: "Critical" },
      ],
      section: "maintenance" as const,
    },
    {
      name: "findingDetails", 
      label: "Finding Incident Details", 
      type: "textarea" as const,
      placeholder: "Provide detailed information about the finding or incident",
      section: "additional" as const,
      richText: true,
    },
  ];

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
        onRowClick={handleRowClick}
      />
      
      <ManageDialog
        open={isManageDialogOpen}
        onOpenChange={setIsManageDialogOpen}
        title={isEditMode ? "Edit Work Request" : "Create New Work Request"}
        formSchema={formSchema}
        defaultValues={formData}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
        headerColor="bg-blue-600"
        showFileUploads={true}
      />
    </div>
  );
};

export default WorkRequestPage;
