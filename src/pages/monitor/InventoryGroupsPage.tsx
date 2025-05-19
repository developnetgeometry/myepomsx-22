
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Box, Search, Filter, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample inventory group data
const inventoryGroups = [
  { 
    id: 'IG-001', 
    name: 'Pressure Vessel Components', 
    itemCount: 42, 
    totalValue: '$245,600', 
    location: 'Warehouse A', 
    status: 'Active' 
  },
  { 
    id: 'IG-002', 
    name: 'Piping Spares', 
    itemCount: 86, 
    totalValue: '$178,450', 
    location: 'Warehouse B', 
    status: 'Active' 
  },
  { 
    id: 'IG-003', 
    name: 'Monitoring Sensors', 
    itemCount: 24, 
    totalValue: '$89,750', 
    location: 'Secure Storage', 
    status: 'Active' 
  },
  { 
    id: 'IG-004', 
    name: 'Safety Equipment', 
    itemCount: 38, 
    totalValue: '$62,300', 
    location: 'Warehouse A', 
    status: 'Limited' 
  },
  { 
    id: 'IG-005', 
    name: 'Calibration Tools', 
    itemCount: 15, 
    totalValue: '$43,600', 
    location: 'Tool Room', 
    status: 'Active' 
  },
];

const InventoryGroupsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Groups" 
        subtitle="Manage and view grouped inventory items and their relationships"
        icon={<Box className="h-6 w-6" />}
      />
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Groups</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="limited">Limited</TabsTrigger>
              </TabsList>
              
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Group
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search groups..." className="pl-8" />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <TabsContent value="all" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Item Count</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryGroups.map((group) => (
                      <TableRow key={group.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{group.id}</TableCell>
                        <TableCell>{group.name}</TableCell>
                        <TableCell>{group.itemCount}</TableCell>
                        <TableCell>{group.totalValue}</TableCell>
                        <TableCell>{group.location}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${
                              group.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                              group.status === 'Limited' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {group.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Item Count</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryGroups
                      .filter(group => group.status === 'Active')
                      .map((group) => (
                        <TableRow key={group.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{group.id}</TableCell>
                          <TableCell>{group.name}</TableCell>
                          <TableCell>{group.itemCount}</TableCell>
                          <TableCell>{group.totalValue}</TableCell>
                          <TableCell>{group.location}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {group.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="limited" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Item Count</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryGroups
                      .filter(group => group.status === 'Limited')
                      .map((group) => (
                        <TableRow key={group.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{group.id}</TableCell>
                          <TableCell>{group.name}</TableCell>
                          <TableCell>{group.itemCount}</TableCell>
                          <TableCell>{group.totalValue}</TableCell>
                          <TableCell>{group.location}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              {group.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryGroupsPage;
