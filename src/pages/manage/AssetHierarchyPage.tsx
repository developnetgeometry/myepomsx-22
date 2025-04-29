
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Layers, ChevronRight, ChevronDown, Settings } from 'lucide-react';
import { assetHierarchy } from '@/data/sampleData';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

type HierarchyNodeProps = {
  node: any;
  level?: number;
  onSelect: (node: any) => void;
};

const HierarchyNode: React.FC<HierarchyNodeProps> = ({ node, level = 0, onSelect }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const hasChildren = node.children && node.children.length > 0;
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  
  const handleSelect = () => {
    onSelect(node);
  };
  
  const getNodeIcon = (type: string) => {
    switch(type) {
      case 'facility': return <Settings className="h-4 w-4 text-blue-500" />;
      case 'system': return <Settings className="h-4 w-4 text-green-500" />;
      case 'package': return <Settings className="h-4 w-4 text-orange-500" />;
      case 'asset': return <Settings className="h-4 w-4 text-purple-500" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="pl-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div 
          className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md ${level === 0 ? 'mt-0' : 'mt-1'}`}
          onClick={handleSelect}
        >
          {hasChildren && (
            <CollapsibleTrigger asChild onClick={handleToggle}>
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 mr-1">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
          )}
          {!hasChildren && <div className="w-5 mr-1" />}
          <span className="mr-2">{getNodeIcon(node.type)}</span>
          <span className="text-sm">{node.name}</span>
        </div>
        
        {hasChildren && (
          <CollapsibleContent>
            <div className="border-l-2 border-gray-200 ml-2 pl-2">
              {node.children.map((child: any, index: number) => (
                <HierarchyNode 
                  key={`${child.id}-${index}`} 
                  node={child} 
                  level={level + 1}
                  onSelect={onSelect} 
                />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

const AssetHierarchyPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  
  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
  };

  const handleExpandAll = () => {
    // In a real application, you would implement logic to expand all nodes
    console.log("Expand all nodes");
  };
  
  const handleCollapseAll = () => {
    // In a real application, you would implement logic to collapse all nodes
    console.log("Collapse all nodes");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Hierarchy" 
        icon={<Layers className="h-6 w-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Hierarchy</h3>
              <div className="flex space-x-2">
                <button 
                  className="text-xs text-blue-500 hover:underline"
                  onClick={handleExpandAll}
                >
                  Expand All
                </button>
                <button 
                  className="text-xs text-blue-500 hover:underline"
                  onClick={handleCollapseAll}
                >
                  Collapse All
                </button>
              </div>
            </div>
            
            <div className="border rounded-md p-2 h-[calc(100vh-250px)] overflow-auto">
              {assetHierarchy.facilities.map((facility, index) => (
                <HierarchyNode 
                  key={`${facility.id}-${index}`} 
                  node={facility} 
                  onSelect={handleNodeSelect} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              {selectedNode ? `${selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Details` : 'Details'}
            </h3>
            
            {selectedNode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <span className="text-xs text-gray-500 block">Name</span>
                    <span className="text-sm font-medium">{selectedNode.name}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <span className="text-xs text-gray-500 block">Type</span>
                    <span className="text-sm font-medium capitalize">{selectedNode.type}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <span className="text-xs text-gray-500 block">ID</span>
                    <span className="text-sm font-medium">{selectedNode.id}</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="text-sm font-medium mb-2">Metadata</h4>
                  <p className="text-sm text-gray-500">
                    Additional information about this {selectedNode.type} would be displayed here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 border rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground">
                  Select an item from the hierarchy tree to view its details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetHierarchyPage;
