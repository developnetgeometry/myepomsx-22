
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Database } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDate } from '@/utils/formatters';
import { toast } from 'sonner';

interface Project {
  id: string;
  projectCode: string;
  projectName: string;
  client: string;
  clientId: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
}

// Sample project data
const initialProjects = [
  {
    id: '1',
    projectCode: 'PRJ001',
    projectName: 'Refinery Upgrade Project',
    client: 'TechOil Solutions',
    clientId: '1',
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
    clientId: '3',
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
    clientId: '4',
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
    clientId: '2',
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
    clientId: '5',
    startDate: '2025-04-15',
    endDate: '2025-07-15',
    status: 'Active',
    description: 'Analysis of critical equipment reliability and improvement recommendations',
  },
];

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProject = initialProjects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      toast.error("Project not found");
      navigate('/admin/setup/project');
    }
  }, [id, navigate]);
  
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Project Information" 
          icon={<Database className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/setup/project')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Project Code</TableCell>
                <TableCell>{project.projectCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Project Name</TableCell>
                <TableCell>{project.projectName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Client</TableCell>
                <TableCell>
                  <Link to={`/admin/setup/client/${project.clientId}`} className="text-blue-600 hover:underline">
                    {project.client}
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Start Date</TableCell>
                <TableCell>{formatDate(new Date(project.startDate))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">End Date</TableCell>
                <TableCell>{formatDate(new Date(project.endDate))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{project.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailPage;
