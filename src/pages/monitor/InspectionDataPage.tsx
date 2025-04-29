
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
import { Card, CardContent } from '@/components/ui/card';
import { FileSearchIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

// Sample data for inspection data
const initialInspections = [
  { 
    id: '1',
    inspectionId: 'INSP-001',
    asset: 'PV-1001',
    inspector: 'John Smith',
    inspectionType: 'Visual',
    result: 'Pass',
    actionRequired: 'None',
    date: '2025-03-15'
  },
  { 
    id: '2',
    inspectionId: 'INSP-002',
    asset: 'PP-2001',
    inspector: 'Sarah Jones',
    inspectionType: 'UT Thickness',
    result: 'Pass',
    actionRequired: 'Monitor in 6 months',
    date: '2025-03-17'
  },
  { 
    id: '3',
    inspectionId: 'INSP-003',
    asset: 'TK-3001',
    inspector: 'Mike Brown',
    inspectionType: 'MFL',
    result: 'Fail',
    actionRequired: 'Repair required',
    date: '2025-03-18'
  },
  { 
    id: '4',
    inspectionId: 'INSP-004',
    asset: 'PV-1002',
    inspector: 'Emily Wilson',
    inspectionType: 'Radiography',
    result: 'Pass',
    actionRequired: 'None',
    date: '2025-03-20'
  },
  { 
    id: '5',
    inspectionId: 'INSP-005',
    asset: 'PP-2002',
    inspector: 'David Clark',
    inspectionType: 'PAUT',
    result: 'Fail',
    actionRequired: 'Replace section',
    date: '2025-03-22'
  },
];

// Inspection types for dropdown
const inspectionTypes = [
  'Visual', 
  'UT Thickness', 
  'MFL', 
  'Radiography', 
  'PAUT', 
  'Eddy Current', 
  'Dye Penetrant', 
  'Magnetic Particle'
];

const InspectionDataPage: React.FC = () => {
  const [inspections, setInspections] = useState(initialInspections);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    inspectionId: '',
    asset: '',
    inspector: '',
    inspectionType: '',
    result: 'Pass',
    actionRequired: '',
    date: ''
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${inspections.length + 1}`,
      inspectionId: `INSP-${String(inspections.length + 1).padStart(3, '0')}`,
      asset: '',
      inspector: '',
      inspectionType: 'Visual',
      result: 'Pass',
      actionRequired: '',
      date: new Date().toISOString().split('T')[0]
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
      setInspections(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setInspections(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'inspectionId', header: 'Inspection ID', accessorKey: 'inspectionId' },
    { id: 'asset', header: 'Asset', accessorKey: 'asset' },
    { id: 'inspector', header: 'Inspector', accessorKey: 'inspector' },
    { id: 'inspectionType', header: 'Inspection Type', accessorKey: 'inspectionType' },
    { 
      id: 'result', 
      header: 'Result', 
      accessorKey: 'result',
      cell: (value) => (
        <span className={`inline-flex items-center gap-1 ${
          value === 'Pass' ? 'text-green-600' : 'text-red-600'
        }`}>
          {value === 'Pass' ? 
            <CheckCircleIcon className="h-4 w-4" /> : 
            <XCircleIcon className="h-4 w-4" />
          }
          {value}
        </span>
      )
    },
    { id: 'actionRequired', header: 'Action Required', accessorKey: 'actionRequired' },
    { id: 'date', header: 'Date', accessorKey: 'date' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inspection Data"
        subtitle="Management of inspection records and findings"
        icon={<FileSearchIcon className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Inspection"
        onSearch={(query) => console.log('Search:', query)}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={inspections}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Inspection Record' : 'Add New Inspection Record'}
            </DialogTitle>
            <DialogDescription>
              Fill in the inspection details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectionId">Inspection ID</Label>
                <Input
                  id="inspectionId"
                  name="inspectionId"
                  value={formData.inspectionId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="asset">Asset</Label>
                <Input
                  id="asset"
                  name="asset"
                  value={formData.asset}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspector">Inspector</Label>
                <Input
                  id="inspector"
                  name="inspector"
                  value={formData.inspector}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspectionType">Inspection Type</Label>
                <select
                  id="inspectionType"
                  name="inspectionType"
                  value={formData.inspectionType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {inspectionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="result">Result</Label>
                <select
                  id="result"
                  name="result"
                  value={formData.result}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="actionRequired">Action Required</Label>
                <Textarea
                  id="actionRequired"
                  name="actionRequired"
                  value={formData.actionRequired}
                  onChange={handleInputChange}
                  rows={2}
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

export default InspectionDataPage;
