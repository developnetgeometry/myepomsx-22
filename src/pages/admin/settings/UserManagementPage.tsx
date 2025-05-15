
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Trash2, Edit, Search, RefreshCw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/shared/PageHeader";
import BlankPageTemplate from "@/components/shared/BlankPageTemplate";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  email: string;
  role: string;
  last_sign_in_at: string | null;
  created_at: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: usersData, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        throw error;
      }

      if (usersData) {
        // Map the users data to our User interface
        const formattedUsers: User[] = usersData.users.map(user => ({
          id: user.id,
          email: user.email || 'No email',
          role: user.role || 'user',
          last_sign_in_at: user.last_sign_in_at,
          created_at: user.created_at
        }));
        setUsers(formattedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. You may not have admin permissions.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'manager':
        return 'bg-blue-500';
      default:
        return 'bg-green-500';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage system users, roles and permissions"
        onAddNew={() => {
          // This will be implemented in the future
          toast({
            title: "Coming Soon",
            description: "User creation functionality is coming soon."
          });
        }}
        addNewLabel="Create User"
        icon={<UserPlus size={16} />}
      />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search users by email, role or ID" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={fetchUsers} 
            disabled={loading}
          >
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Email</TableHead>
                <TableHead className="w-1/5">Role</TableHead>
                <TableHead className="w-1/5">Last Sign In</TableHead>
                <TableHead className="w-1/5">Created At</TableHead>
                <TableHead className="w-1/5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <RefreshCw size={20} className="animate-spin mr-2" />
                      Loading users...
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.last_sign_in_at)}</TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {searchTerm ? 'No users match your search.' : 'No users found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
