
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Download, Filter } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

interface PageHeaderProps {
  title: string;
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

  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      
      <div className="flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 h-10 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button type="submit" variant="default" className="h-10 px-4">
            Go
          </Button>
        </form>
        
        <div className="flex items-center gap-2">
          {showFilter && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {filterOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option}
                    onClick={() => onFilterSelect && onFilterSelect(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {showExport && (
            <Button variant="outline" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          
          {onAddNew && (
            <Button variant="default" className="h-10" onClick={onAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              {addNewLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
