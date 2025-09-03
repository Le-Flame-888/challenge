import { UserForm } from '@/core/users/forms/UserForm';
import { useCreateUser } from '@/core/users/hooks/useCreate.hook';
import { useNavigate } from '@tanstack/react-router';
import { Alert, Snackbar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import type { CreateUserType } from '@/core/users/schemas/user.schema';

export function CreateUserFeature() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({ open: false, message: '', severity: 'info' });

  const { mutate, isPending } = useCreateUser({
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: 'User created successfully!',
        severity: 'success',
      });
      setTimeout(() => {
        navigate({ to: '/' });
      }, 1500);
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: error?.message || 'Failed to create user. Please try again.',
        severity: 'error',
      });
    },
  });

  const handleSubmit = (data: CreateUserType) => {
    mutate(data);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New User
      </Typography>
      
      <UserForm 
        onSubmit={handleSubmit} 
        isPending={isPending} 
        submitButtonText="Create User"
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
