
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from './AuthContext';

type Project = {
  id: string;
  name: string;
  route?: string;
  project_code?: string;
  short_name?: string;
  project_purpose?: string;
};

type ProjectContextType = {
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  projects: Project[];
  loading: boolean;
  error: string | null;
};

const defaultContext: ProjectContextType = {
  currentProject: null,
  setCurrentProject: () => {},
  projects: [],
  loading: false,
  error: null,
};

const ProjectContext = createContext<ProjectContextType>(defaultContext);

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProjects = async () => {
    if (!user) {
      setProjects([]);
      setCurrentProject(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Fetching projects for user:', user.id);

      // Use the exact SQL structure you provided
      const { data, error: fetchError } = await supabase
        .from('user_projects')
        .select(`
          project_id,
          e_project!inner (
            id,
            project_name,
            project_code,
            short_name,
            project_purpose
          )
        `)
        .eq('user_id', user.id);

      if (fetchError) {
        console.error('Error fetching user projects:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Fetched user projects data:', data);

      // Transform the data to match our Project type
      const userProjects: Project[] = (data || []).map((item: any) => ({
        id: item.e_project.id.toString(),
        name: item.e_project.project_name || 'Unnamed Project',
        project_code: item.e_project.project_code,
        short_name: item.e_project.short_name,
        project_purpose: item.e_project.project_purpose,
      }));

      console.log('Transformed projects:', userProjects);

      setProjects(userProjects);

      // Set the first project as current if no current project is set
      if (userProjects.length > 0 && !currentProject) {
        setCurrentProject(userProjects[0]);
      }

    } catch (err) {
      console.error('Unexpected error fetching projects:', err);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, [user]);

  const value = {
    currentProject,
    setCurrentProject,
    projects,
    loading,
    error,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
