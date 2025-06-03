
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProject } from '@/contexts/ProjectContext';
import Overview from './Overview';
import UserProfile from '@/components/auth/UserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, UserPlus } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const { currentProject } = useProject();
  const navigate = useNavigate();
  
  console.log(`Loading data for project: ${currentProject.name} (ID: ${currentProject.id})`);
  
  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If user is authenticated, show the main overview and user profile
  if (user) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <UserProfile />
        </div>
        <Overview />
      </div>
    );
  }

  // If user is not authenticated, show welcome page with auth options
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Please sign in to access the Asset Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => navigate('/auth')} 
            className="w-full"
            size="lg"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/auth" 
                className="font-medium text-primary hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
