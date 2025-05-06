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
import { Database } from 'lucide-react';

// Sample data
const initialAssetTags = [
  {
    id: '1',
    tagCode: 'PMP-001',
    description: 'Main Feed Water Pump',
    system: 'Boiler Feed Water',
    status: 'Active',
  },
  {
    id: '2',
    tagCode: 'HX-101',
    description: 'Heat Exchanger',
    system: 'Cooling Water',
    status: 'Active',
  },
  {
    id: '3',
    tagCode: 'TK-201',
    description: 'Storage Tank',
    system: 'Crude Oil Storage',
    status: 'Active',
  },
  {
    id: '4',
    tagCode: 'VLV-301',
    description: 'Control Valve',
    system: 'Steam Distribution',
    status: 'Inactive',
  },
  {
    id: '5',
    tagCode: 'MOT-401',
    description: 'Electric Motor',
    system: 'Compressor Drive',
    status: 'Active',
  },
];

const AssetTagPage: React.FC = () => {
  const navigate = useNavigate();
  const [assetTags, setAssetTags] = useState(initialAssetTags);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    tagCode: '',
    description: '',
    system: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${assetTags.length + 1}`,
      tagCode: '',
      description: '',
      system: '',
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

  const handleRowClick = (row: any) => {
    navigate(`/admin/settings/asset-tag/${row.id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setAssetTags(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setAssetTags(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'tagCode', header: 'Tag Code', accessorKey: 'tagCode' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'system', header: 'System', accessorKey: 'system' },
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
        title="Asset Tag Settings" 
        subtitle="Manage asset tags for equipment identification and tracking"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Asset Tag"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={assetTags}
        onEdit={handleEdit}
        onRowClick={handleRowClick}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Asset Tag' : 'Add New Asset Tag'}
            </DialogTitle>
            <DialogDescription>
              Fill in the asset tag details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tagCode">Tag Code</Label>
                <Input
                  id="tagCode"
                  name="tagCode"
                  value={formData.tagCode}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., PMP-001, VLV-101"
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
                <Label htmlFor="system">System</Label>
                <Input
                  id="system"
                  name="system"
                  value={formData.system}
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

export default AssetTagPage;
