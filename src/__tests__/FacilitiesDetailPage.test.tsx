
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import FacilityDetailPage from '@/pages/manage/FacilityDetailPage';
import { useFacility, useUpdateFacility } from '@/hooks/queries/useFacilities';
import { toast } from 'sonner';

// Mock the hooks and dependencies
vi.mock('@/hooks/queries/useFacilities');
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('@/components/shared/PageHeader', () => ({
  default: ({ title }: { title: string }) => <h1>{title}</h1>
}));

vi.mock('@/components/manage/ManageDialog', () => ({
  default: ({ open, onSubmit, defaultValues }: { open: boolean; onSubmit: (data: any) => void; defaultValues: any }) => 
    open ? (
      <div data-testid="edit-dialog">
        <button 
          data-testid="submit-edit"
          onClick={() => onSubmit({ 
            location_code: 'NEW-CODE', 
            location_name: 'New Facility Name' 
          })}
        >
          Submit
        </button>
      </div>
    ) : null
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => mockNavigate
  };
});

describe('FacilityDetailPage', () => {
  const mockFacility = {
    id: 123,
    location_code: 'FAC-001',
    location_name: 'Main Facility',
    is_active: true,
    project_id: 456,
    created_at: new Date().toISOString(),
    created_by: 'test-user',
    updated_at: new Date().toISOString(),
    updated_by: 'test-user'
  };
  
  const mockUpdateMutation = {
    mutateAsync: vi.fn(),
    isPending: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup the mock returns
    vi.mocked(useFacility).mockReturnValue({ 
      data: mockFacility, 
      isLoading: false, 
      error: null 
    } as any);
    
    vi.mocked(useUpdateFacility).mockReturnValue(mockUpdateMutation as any);
  });

  it('should render the facility details correctly', () => {
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Facility Detail')).toBeInTheDocument();
    expect(screen.getByText('Facility Location Code')).toBeInTheDocument();
    expect(screen.getByText('FAC-001')).toBeInTheDocument();
    expect(screen.getByText('Facility Location')).toBeInTheDocument();
    expect(screen.getByText('Main Facility')).toBeInTheDocument();
  });

  it('should navigate back to facilities list when back button is clicked', () => {
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    const backButton = screen.getByText(/Back to Facilities/i);
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/manage/facilities');
  });

  it('should display loading state when data is loading', () => {
    vi.mocked(useFacility).mockReturnValue({ 
      data: null, 
      isLoading: true, 
      error: null 
    } as any);
    
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Loading facility details...')).toBeInTheDocument();
  });

  it('should display error state when there is an error', () => {
    vi.mocked(useFacility).mockReturnValue({ 
      data: null, 
      isLoading: false, 
      error: new Error('Failed to load') 
    } as any);
    
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Error loading facility: Failed to load')).toBeInTheDocument();
  });

  it('should show edit dialog when edit button is clicked', async () => {
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    // Two edit buttons (one for each field) - click the first one
    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('edit-dialog')).toBeInTheDocument();
    });
  });
  
  it('should update facility when edit form is submitted', async () => {
    mockUpdateMutation.mutateAsync.mockResolvedValue({});
    
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    // Open edit dialog
    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);
    
    // Submit the edit form
    const submitButton = await screen.findByTestId('submit-edit');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockUpdateMutation.mutateAsync).toHaveBeenCalledWith({
        id: 123,
        location_code: 'NEW-CODE',
        location_name: 'New Facility Name',
        is_active: true,
        project_id: 456,
        created_at: mockFacility.created_at,
        created_by: mockFacility.created_by,
        updated_at: mockFacility.updated_at,
        updated_by: mockFacility.updated_by
      });
      expect(toast.success).toHaveBeenCalledWith('Facility updated successfully');
    });
  });
  
  it('should show error toast when update fails', async () => {
    const mockError = new Error('Update failed');
    mockUpdateMutation.mutateAsync.mockRejectedValue(mockError);
    
    render(
      <MemoryRouter>
        <FacilityDetailPage />
      </MemoryRouter>
    );
    
    // Open edit dialog
    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);
    
    // Submit the edit form
    const submitButton = await screen.findByTestId('submit-edit');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error updating facility: Update failed');
    });
  });
});
