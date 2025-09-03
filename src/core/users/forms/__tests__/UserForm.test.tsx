import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from '../UserForm';
import { vi } from 'vitest';

const mockOnSubmit = vi.fn();

describe('UserForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with default values', () => {
    render(<UserForm onSubmit={mockOnSubmit} isPending={false} />);
    
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('');
    expect(screen.getByLabelText(/age/i)).toHaveValue('');
    expect(screen.getByLabelText(/role/i)).toHaveValue('user');
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('validates required fields', async () => {
    render(<UserForm onSubmit={mockOnSubmit} isPending={false} />);
    
    fireEvent.click(screen.getByRole('button', { name: /create user/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/last name must be at least 2 characters/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(<UserForm onSubmit={mockOnSubmit} isPending={false} />);
    
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
    
    fireEvent.click(screen.getByRole('button', { name: /create user/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
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

  it('disables the form when isPending is true', () => {
    render(<UserForm onSubmit={mockOnSubmit} isPending={true} />);
    
    expect(screen.getByRole('button', { name: /saving.../i })).toBeDisabled();
    expect(screen.getByLabelText(/email address/i)).toBeDisabled();
    expect(screen.getByLabelText(/first name/i)).toBeDisabled();
    expect(screen.getByLabelText(/last name/i)).toBeDisabled();
    expect(screen.getByLabelText(/age/i)).toBeDisabled();
    expect(screen.getByLabelText(/role/i)).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
