
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, Filter, Plus, ChevronRight, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample BOM data
const bomItems = [
  {
    id: 'BOM-001',
    name: 'Pressure Vessel Assembly',
    parentAsset: 'PV-1023',
    components: 24,
    lastUpdated: '2023-10-15',
    status: 'Current'
  },
  {
    id: 'BOM-002',
    name: 'Heat Exchanger Assembly',
    parentAsset: 'HE-4578',
    components: 18,
    lastUpdated: '2023-09-22',
    status: 'Current'
  },
  {
    id: 'BOM-003',
    name: 'Transfer Pump Assembly',
    parentAsset: 'P-7892',
    components: 36,
    lastUpdated: '2023-11-05',
    status: 'Current'
  },
  {
    id: 'BOM-004',
    name: 'Compressor Unit',
    parentAsset: 'CMP-3452',
    components: 42,
    lastUpdated: '2023-08-30',
    status: 'Outdated'
  },
  {
    id: 'BOM-005',
    name: 'Control System Panel',
    parentAsset: 'CS-8910',
    components: 53,
    lastUpdated: '2023-10-28',
    status: 'Current'
  }
];

const BomAssemblyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bill of Materials Assembly" 
        subtitle="Manage and view equipment bill of materials and assembly information"
        icon={<FileText className="h-6 w-6" />}
      />
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All BOMs</TabsTrigger>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="outdated">Outdated</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New BOM
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search BOMs..." className="pl-8" />
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
                      <TableHead>BOM ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Parent Asset</TableHead>
                      <TableHead>Components</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bomItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.parentAsset}</TableCell>
                        <TableCell>{item.components}</TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${
                              item.status === 'Current' ? 'bg-green-50 text-green-700 border-green-200' :
                              'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="current" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>BOM ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Parent Asset</TableHead>
                      <TableHead>Components</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bomItems
                      .filter(item => item.status === 'Current')
                      .map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.parentAsset}</TableCell>
                          <TableCell>{item.components}</TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="outdated" className="pt-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>BOM ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Parent Asset</TableHead>
                      <TableHead>Components</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bomItems
                      .filter(item => item.status === 'Outdated')
                      .map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.parentAsset}</TableCell>
                          <TableCell>{item.components}</TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
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

export default BomAssemblyPage;
