
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
import { ShieldAlertIcon } from 'lucide-react';

// Sample data for RBI assessments
const initialRbiData = [
  { 
    id: '1',
    rbiId: 'RBI-001',
    asset: 'PV-1001',
    likelihood: 'Medium',
    consequence: 'High',
    riskRank: 'High',
    nextAssessmentDate: '2025-09-15',
    status: 'Active'
  },
  { 
    id: '2',
    rbiId: 'RBI-002',
    asset: 'PP-2003',
    likelihood: 'Low',
    consequence: 'Medium',
    riskRank: 'Medium',
    nextAssessmentDate: '2025-10-22',
    status: 'Active'
  },
  { 
    id: '3',
    rbiId: 'RBI-003',
    asset: 'PV-1002',
    likelihood: 'High',
    consequence: 'High',
    riskRank: 'Critical',
    nextAssessmentDate: '2025-07-30',
    status: 'Active'
  },
  { 
    id: '4',
    rbiId: 'RBI-004',
    asset: 'PP-2001',
    likelihood: 'Low',
    consequence: 'Low',
    riskRank: 'Low',
    nextAssessmentDate: '2025-12-05',
    status: 'Active'
  },
  { 
    id: '5',
    rbiId: 'RBI-005',
    asset: 'PV-1003',
    likelihood: 'Medium',
    consequence: 'Medium',
    riskRank: 'Medium',
    nextAssessmentDate: '2025-11-18',
    status: 'Complete'
  },
];

const RBIAssessmentPage: React.FC = () => {
  const [rbiData, setRbiData] = useState(initialRbiData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    rbiId: '',
    asset: '',
    likelihood: 'Low',
    consequence: 'Low',
    riskRank: 'Low',
    nextAssessmentDate: '',
    status: 'Active'
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${rbiData.length + 1}`,
      rbiId: `RBI-${String(rbiData.length + 1).padStart(3, '0')}`,
      asset: '',
      likelihood: 'Low',
      consequence: 'Low',
      riskRank: 'Low',
      nextAssessmentDate: '',
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
    
    // Calculate risk rank based on likelihood and consequence
    if (name === 'likelihood' || name === 'consequence') {
      const likelihood = name === 'likelihood' ? value : formData.likelihood;
      const consequence = name === 'consequence' ? value : formData.consequence;
      const riskRank = calculateRiskRank(likelihood, consequence);
      
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        riskRank 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Utility function to calculate risk rank
  const calculateRiskRank = (likelihood: string, consequence: string) => {
    if (likelihood === 'High' && consequence === 'High') {
      return 'Critical';
    } else if (likelihood === 'High' || consequence === 'High') {
      return 'High';
    } else if (likelihood === 'Medium' && consequence === 'Medium') {
      return 'Medium';
    } else if (likelihood === 'Medium' || consequence === 'Medium') {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setRbiData(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setRbiData(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  // Function to get appropriate color class based on risk rank
  const getRiskRankColor = (rank: string) => {
    switch(rank) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: Column[] = [
    { id: 'rbiId', header: 'RBI ID', accessorKey: 'rbiId' },
    { id: 'asset', header: 'Asset', accessorKey: 'asset' },
    { 
      id: 'likelihood', 
      header: 'Likelihood', 
      accessorKey: 'likelihood',
      cell: (value) => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
          value === 'High' ? 'bg-red-100 text-red-800' :
          value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      id: 'consequence', 
      header: 'Consequence', 
      accessorKey: 'consequence',
      cell: (value) => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
          value === 'High' ? 'bg-red-100 text-red-800' :
          value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      id: 'riskRank', 
      header: 'Risk Rank', 
      accessorKey: 'riskRank',
      cell: (value) => (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getRiskRankColor(value)}`}>
          {value}
        </span>
      )
    },
    { id: 'nextAssessmentDate', header: 'Next Assessment Date', accessorKey: 'nextAssessmentDate' },
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
        title="RBI Assessment"
        subtitle="Risk-Based Inspection assessment management"
        icon={<ShieldAlertIcon className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Assessment"
        onSearch={(query) => console.log('Search:', query)}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={rbiData}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit RBI Assessment' : 'Add New RBI Assessment'}
            </DialogTitle>
            <DialogDescription>
              Fill in the assessment details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rbiId">RBI ID</Label>
                <Input
                  id="rbiId"
                  name="rbiId"
                  value={formData.rbiId}
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
                <Label htmlFor="likelihood">Likelihood</Label>
                <select
                  id="likelihood"
                  name="likelihood"
                  value={formData.likelihood}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="consequence">Consequence</Label>
                <select
                  id="consequence"
                  name="consequence"
                  value={formData.consequence}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="riskRank">Risk Rank</Label>
                <Input
                  id="riskRank"
                  name="riskRank"
                  value={formData.riskRank}
                  readOnly
                  className="bg-gray-50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nextAssessmentDate">Next Assessment Date</Label>
                <Input
                  id="nextAssessmentDate"
                  name="nextAssessmentDate"
                  type="date"
                  value={formData.nextAssessmentDate}
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
                  <option value="Complete">Complete</option>
                  <option value="On Hold">On Hold</option>
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

export default RBIAssessmentPage;
