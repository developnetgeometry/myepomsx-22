
import React from 'react';
import { render, screen, waitFor } from './test-utils';
import { vi } from 'vitest';
import FacilityDetailPage from '@/pages/manage/FacilityDetailPage';

// Mock the facility service
vi.mock('@/services/facilityService', () => ({
  facilityService: {
    getFacilityById: vi.fn(),
    getSystemsByFacilityId: vi.fn(),
    getAssetsByFacilityId: vi.fn(),
  },
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('FacilityDetailPage', () => {
  it('renders without crashing', async () => {
    render(<FacilityDetailPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Facility Details/i)).toBeInTheDocument();
    });
  });
});
