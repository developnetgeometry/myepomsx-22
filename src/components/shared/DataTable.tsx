
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pencil, MoreHorizontal, Download, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export interface Column {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  pageSize?: number;
  onRowClick?: (row: any) => void;
  onDelete?: (row: any) => void;
  onExport?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns = [],
  onEdit,
  pageSize = 10,
  onRowClick,
  onDelete,
  onExport
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any>(null);
  
  const totalPages = Math.ceil(data.length / pageSize);
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleDeleteClick = (row: any) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (rowToDelete && onDelete) {
      onDelete(rowToDelete);
      toast.success("Item deleted successfully");
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };
  
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export to CSV functionality
      const headers = columns.map(col => col.header).join(',');
      const rows = data.map(row => 
        columns.map(col => {
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
  };

  return (
    <div className="w-full">
      {data.length > 0 && (
        <div className="flex justify-end mb-4 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExport}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      )}
      
      <div className="rounded-md border shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id}>{column.header}</TableHead>
                ))}
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((row, rowIndex) => (
                  <TableRow 
                    key={rowIndex} 
                    className={onRowClick ? "cursor-pointer" : ""}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.id}`}>
                        {column.cell 
                          ? column.cell(row[column.accessorKey]) 
                          : column.accessorKey.includes('status') 
                            ? <StatusBadge status={row[column.accessorKey]} />
                            : row[column.accessorKey]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onEdit && (
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(row);
                              }}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <>
                              {onEdit && <DropdownMenuSeparator />}
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(row);
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {data.length > pageSize && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
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
                        <span className="px-2">...</span>
                        <Button 
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataTable;
