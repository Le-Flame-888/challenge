import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CreateUserFeature } from '../create.feature';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from '@tanstack/react-router';
import { vi } from 'vitest';

// Mock the useCreateUser hook
vi.mock('@/core/users/hooks/useCreate.hook', () => ({
  useCreateUser: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </QueryClientProvider>
);

describe('CreateUserFeature', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the create user form', () => {
    render(<CreateUserFeature />, { wrapper });
    
    expect(screen.getByRole('heading', { name: /create new user/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create user/i })).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockMutate = vi.fn();
    vi.mocked(useCreateUser).mockImplementation(() => ({
      mutate: mockMutate,
      isPending: false,
    }));

    render(<CreateUserFeature />, { wrapper });

    // Fill out the form
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.input(screen.getByLabelText(/first name/i), {
      target: { value: 'John' },
    });
    
    fireEvent.input(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' },
    });
    
    fireEvent.input(screen.getByLabelText(/age/i), {
      target: { value: '25' },
    });
    
    fireEvent.mouseDown(screen.getByLabelText(/role/i));
    fireEvent.click(screen.getByText(/admin/i));
    
    fireEvent.click(screen.getByRole('checkbox'));
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create user/i }));
    
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'test@example.com',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          age: 25,
        },
        role: 'admin',
        isActive: true,
      });
    });
  });

  it('shows loading state when form is submitting', () => {
    vi.mocked(useCreateUser).mockImplementation(() => ({
      mutate: vi.fn(),
      isPending: true,
    }));

    render(<CreateUserFeature />, { wrapper });
    
    expect(screen.getByRole('button', { name: /saving.../i })).toBeDisabled();
  });
});
