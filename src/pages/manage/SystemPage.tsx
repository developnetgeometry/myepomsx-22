
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
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
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
    status: 'Active',
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
      ...newSystem
    };
    
    setSystems([...systems, systemToAdd]);
    setIsDialogOpen(false);
    
    // Reset the form
    setNewSystem({
      systemId: '',
      name: '',
      description: '',
      status: 'Active',
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New System</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new system.
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="systemId" className="text-right">
                  System ID
                </Label>
                <Input
                  id="systemId"
                  value={newSystem.systemId}
                  onChange={(e) => setNewSystem({...newSystem, systemId: e.target.value})}
                  className="col-span-3"
                  required
                  placeholder="e.g. SYS006"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newSystem.name}
                  onChange={(e) => setNewSystem({...newSystem, name: e.target.value})}
                  className="col-span-3"
                  required
                  placeholder="System name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newSystem.description}
                  onChange={(e) => setNewSystem({...newSystem, description: e.target.value})}
                  className="col-span-3"
                  placeholder="System description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  value={newSystem.status}
                  onChange={(e) => setNewSystem({...newSystem, status: e.target.value})}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
              <Button type="submit">Create System</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemPage;
