import React, { useState, useMemo, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pencil, Download, Trash2, FileText, Eye, Filter, SortAsc, SortDesc, MoreHorizontal, Check, X } from 'lucide-react';
import StatusBadge from './StatusBadge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface Column {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
  isSortable?: boolean;
  isFilterable?: boolean;
  isVisible?: boolean;
  isCurrency?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  pageSize?: number;
  onRowClick?: (row: any) => void;
  onDelete?: (row: any) => void;
  onExport?: () => void;
  onViewDetails?: (row: any) => void;
  onAddNew?: () => void;
  searchPlaceholder?: string;
  title?: string;
  showColumnVisibility?: boolean;
  showFilters?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns: initialColumns = [],
  onEdit,
  pageSize = 10,
  onRowClick,
  onDelete,
  onExport,
  onViewDetails,
  onAddNew,
  searchPlaceholder = "Search...",
  title,
  showColumnVisibility = true,
  showFilters = true,
}) => {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState(initialColumns.map(col => ({ ...col, isVisible: col.isVisible !== false })));
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  // Get visible columns
  const visibleColumns = useMemo(() => columns.filter(col => col.isVisible), [columns]);

  // Handle search, filter, and sort
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(item => {
        return Object.keys(item).some(key => {
          const value = item[key];
          return value && value.toString().toLowerCase().includes(lowerSearchTerm);
        });
      });
    }
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        const filterValue = filters[key].toLowerCase();
        result = result.filter(item => {
          const value = item[key];
          return value && value.toString().toLowerCase().includes(filterValue);
        });
      }
    });
    
    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue > bValue ? 1 : -1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }
    
    return result;
  }, [data, searchTerm, filters, sortConfig]);
  
  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  const handleDeleteClick = useCallback((row: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  }, []);
  
  const handleDeleteConfirm = useCallback(async () => {
    if (rowToDelete && onDelete) {
      setIsDeleteLoading(true);
      try {
        await onDelete(rowToDelete);
      } finally {
        setIsDeleteLoading(false);
        setDeleteDialogOpen(false);
        setRowToDelete(null);
      }
    }
  }, [rowToDelete, onDelete]);
  
  const handleEditClick = useCallback((row: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(row);
    }
  }, [onEdit]);

  const handleViewDetailsClick = useCallback((row: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(row);
    } else if (onRowClick) {
      onRowClick(row);
    }
  }, [onViewDetails, onRowClick]);
  
  const handleRowClickEvent = useCallback((row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }, [onRowClick]);
  
  const handleExport = useCallback(() => {
    if (onExport) {
      onExport();
    } else {
      // Default export to CSV functionality
      const headers = visibleColumns.map(col => col.header).join(',');
      const rows = filteredData.map(row => 
        visibleColumns.map(col => {
          const value = row[col.accessorKey];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      ).join('\n');
      
      const csvContent = `${headers}\n${rows}`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Export completed");
    }
  }, [onExport, visibleColumns, filteredData]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig && prevConfig.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null; // Clear sort on third click
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const handleToggleColumn = useCallback((columnId: string) => {
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.id === columnId ? { ...col, isVisible: !col.isVisible } : col
      )
    );
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const handleAddNew = useCallback(() => {
    if (onAddNew) {
      onAddNew();
    }
  }, [onAddNew]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page
  }, []);

  const formatCellValue = useCallback((column: Column, value: any, row: any) => {
    if (column.cell) {
      return column.cell(value, row);
    }
    
    if (column.isCurrency && typeof value === 'number') {
      return `RM ${value.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    if (column.accessorKey.includes('status')) {
      return <StatusBadge status={value} />;
    }
    
    return value;
  }, []);

  const renderSortIcon = useCallback((columnId: string) => {
    if (!sortConfig) return null;
    if (sortConfig.key !== columnId) return null;
    return sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4 ml-1" /> : <SortDesc className="h-4 w-4 ml-1" />;
  }, [sortConfig]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Input 
              placeholder={searchPlaceholder} 
              value={searchTerm} 
              onChange={handleSearch} 
              className="w-full"
            />
          </div>
          
          {showFilters && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 px-3">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                  <h4 className="font-medium">Filter Data</h4>
                  {columns.filter(col => col.isFilterable !== false).map(column => (
                    <div key={column.id} className="space-y-1">
                      <label htmlFor={`filter-${column.id}`} className="text-sm font-medium">
                        {column.header}
                      </label>
                      <Input
                        id={`filter-${column.id}`}
                        placeholder={`Filter by ${column.header.toLowerCase()}`}
                        value={filters[column.accessorKey] || ''}
                        onChange={(e) => handleFilterChange(column.accessorKey, e.target.value)}
                        className="h-8"
                      />
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFilters({});
                        setCurrentPage(1);
                      }}
                    >
                      Clear
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => document.body.click()} // Close popover
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          {showColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 px-3">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExport}>
                  <FileText className="h-4 w-4 mr-2" /> Export to CSV
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <div className="p-2">
                  <p className="text-xs font-medium mb-2">Toggle Columns</p>
                </div>
                {columns.map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.isVisible}
                    onCheckedChange={() => handleToggleColumn(column.id)}
                  >
                    {column.header}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {onAddNew && (
            <Button onClick={handleAddNew} className="ml-2">
              + New
            </Button>
          )}
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-100 shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-100">
                {visibleColumns.map((column) => (
                  <TableHead 
                    key={column.id} 
                    className="py-3 px-6 text-sm font-semibold text-gray-900"
                    onClick={() => column.isSortable !== false && handleSort(column.accessorKey)}
                    style={{ cursor: column.isSortable !== false ? 'pointer' : 'default' }}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.isSortable !== false && renderSortIcon(column.accessorKey)}
                    </div>
                  </TableHead>
                ))}
                {(onEdit || onDelete || onViewDetails) && (
                  <TableHead className="w-24 text-right px-6 text-sm font-semibold text-gray-900">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + ((onEdit || onDelete || onViewDetails) ? 1 : 0)} className="h-24 text-center text-gray-500">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((row, rowIndex) => (
                  <TableRow 
                    key={rowIndex} 
                    className={`border-t border-gray-100 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${onRowClick ? "cursor-pointer hover:bg-blue-50 transition-colors duration-150" : ""}`}
                    onClick={onRowClick ? () => handleRowClickEvent(row) : undefined}
                  >
                    {visibleColumns.map((column) => (
                      <TableCell 
                        key={`${rowIndex}-${column.id}`}
                        className="py-4 px-6 text-sm text-gray-900"
                      >
                        {formatCellValue(column, row[column.accessorKey], row)}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete || onViewDetails) && (
                      <TableCell className="text-right py-2 pr-6">
                        <div className="flex space-x-2 justify-end">
                          {onViewDetails && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={(e) => handleViewDetailsClick(row, e)}
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View Details</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Details</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          
                          {onEdit && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={(e) => handleEditClick(row, e)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          
                          {onDelete && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={(e) => handleDeleteClick(row, e)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredData.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
            <div className="text-sm text-gray-600">
              {Object.keys(filters).length > 0 || searchTerm ? (
                <div className="flex items-center gap-2">
                  <span>Filtered results: {filteredData.length}</span>
                  {Object.keys(filters).map(key => filters[key] && (
                    <Badge key={key} variant="outline" className="flex items-center gap-1">
                      {columns.find(col => col.accessorKey === key)?.header}: {filters[key]}
                      <button 
                        onClick={() => handleFilterChange(key, '')}
                        className="text-gray-500 hover:text-gray-700 ml-1"
                      >
                        <span className="sr-only">Remove</span>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {searchTerm && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Search: {searchTerm}
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-gray-500 hover:text-gray-700 ml-1"
                      >
                        <span className="sr-only">Clear search</span>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              ) : (
                <span>Total {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'}</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 text-gray-700 border-gray-200 hover:bg-gray-50"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {filteredData.length > pageSize && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 p-0 border-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 5) return true;
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => {
                  // Add ellipsis if pages are skipped
                  if (index > 0 && page > array[index - 1] + 1) {
                    return (
                      <React.Fragment key={`ellipsis-${page}`}>
                        <span className="px-2 text-gray-500">...</span>
                        <Button 
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className={`h-9 w-9 p-0 ${currentPage === page ? 'bg-blue-600' : 'border-gray-200'}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    );
                  }
                  return (
                    <Button 
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={`h-9 w-9 p-0 ${currentPage === page ? 'bg-blue-600' : 'border-gray-200'}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })
              }
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 p-0 border-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm} 
              className="bg-destructive text-destructive-foreground"
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Deleting...
                </>
              ) : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataTable;
