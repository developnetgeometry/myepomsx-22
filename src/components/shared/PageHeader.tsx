import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Download, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onSearch?: (query: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;
  showExport?: boolean;
  showFilter?: boolean;
  filterOptions?: string[];
  onFilterSelect?: (filter: string) => void;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  onSearch,
  onAddNew,
  addNewLabel = "Add New",
  showExport = true,
  showFilter = true,
  filterOptions = ["All", "Active", "Inactive", "Pending"],
  onFilterSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  return <div className="page-header space-y-4 mb-6">
      <div className="flex items-center gap-3">
        {icon && <div className="text-epomsx-primary">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        
        
        <div className="flex items-center gap-2">
          {showFilter && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {filterOptions.map(option => <DropdownMenuItem key={option} onClick={() => onFilterSelect && onFilterSelect(option)}>
                    {option}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>}
          
          {showExport && <Button variant="outline" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>}
          
          {onAddNew && <Button variant="default" className="h-10" onClick={onAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              {addNewLabel}
            </Button>}
        </div>
      </div>
    </div>;
};
export default PageHeader;