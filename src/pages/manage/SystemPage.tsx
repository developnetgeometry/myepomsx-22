
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data
const initialSystems = [
  {
    id: '1',
    systemId: 'SYS001',
    name: 'Feed Water System',
    description: 'Process feed water treatment and distribution',
    status: 'Active',
  },
  {
    id: '2',
    systemId: 'SYS002',
    name: 'Steam Generation',
    description: 'Main boiler and steam production system',
    status: 'Active',
  },
  {
    id: '3',
    systemId: 'SYS003',
    name: 'Cooling Water',
    description: 'Plant cooling water circulation and treatment',
    status: 'Active',
  },
  {
    id: '4',
    systemId: 'SYS004',
    name: 'Air Compression',
    description: 'Instrument and plant air compression system',
    status: 'Active',
  },
  {
    id: '5',
    systemId: 'SYS005',
    name: 'Power Distribution',
    description: 'Electrical power distribution network',
    status: 'Inactive',
  },
];

const SystemPage: React.FC = () => {
  const navigate = useNavigate();
  const [systems, setSystems] = useState(initialSystems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSystem, setNewSystem] = useState({
    systemId: '',
    name: '',
    description: '',
    isActive: true,
  });
  const { toast } = useToast();

  const columns: Column[] = [
    { id: 'systemId', header: 'System ID', accessorKey: 'systemId' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
  ];

  const handleRowClick = (row: any) => {
    navigate(`/manage/system/${row.id}`);
  };

  const handleAddSystem = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new ID for the system
    const newId = (systems.length + 1).toString();
    
    // Add the new system to the list
    const systemToAdd = {
      id: newId,
      systemId: newSystem.systemId,
      name: newSystem.name,
      description: newSystem.description,
      status: newSystem.isActive ? 'Active' : 'Inactive',
    };
    
    setSystems([...systems, systemToAdd]);
    setIsDialogOpen(false);
    
    // Reset the form
    setNewSystem({
      systemId: '',
      name: '',
      description: '',
      isActive: true,
    });
    
    // Show success toast
    toast({
      title: "System Added",
      description: `${newSystem.name} has been successfully added.`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Systems" 
        subtitle="Manage plant systems and subsystems"
        onAddNew={handleAddSystem}
        addNewLabel="+ Add System"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={systems}
        onRowClick={handleRowClick}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New System</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new system.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            onClick={() => setIsDialogOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="systemId" className="text-sm font-medium">
                  System ID
                </Label>
                <Input
                  id="systemId"
                  value={newSystem.systemId}
                  onChange={(e) => setNewSystem({...newSystem, systemId: e.target.value})}
                  className="w-full mt-1"
                  required
                  placeholder="e.g. SYS006"
                />
              </div>
              
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  System Name
                </Label>
                <Input
                  id="name"
                  value={newSystem.name}
                  onChange={(e) => setNewSystem({...newSystem, name: e.target.value})}
                  className="w-full mt-1"
                  required
                  placeholder="System name"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newSystem.description}
                  onChange={(e) => setNewSystem({...newSystem, description: e.target.value})}
                  className="w-full mt-1"
                  placeholder="System description"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="isActive"
                  checked={newSystem.isActive}
                  onCheckedChange={(checked) => 
                    setNewSystem({...newSystem, isActive: checked === true})
                  }
                  className="h-5 w-5 border-2"
                />
                <Label 
                  htmlFor="isActive" 
                  className="text-sm font-medium cursor-pointer"
                >
                  Active
                </Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create System</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemPage;
