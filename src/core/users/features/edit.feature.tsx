import { useParams, useNavigate } from '@tanstack/react-router';
import { useReadUser } from '@/core/users/hooks/useRead.hook';
import { useUpdateUser } from '@/core/users/hooks/useUpdate.hook';
import { UserForm } from '@/core/users/forms/UserForm';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import type { CreateUserType } from '../api/create.api';

export function EditUserFeature() {
  const { userId } = useParams({ from: '/$userId/edit' });
  const navigate = useNavigate();
  console.log('EditUserFeature - userId:', userId);
  
  const { data: user, isLoading, isError, error } = useReadUser(Number(userId));
  console.log('EditUserFeature - User data:', user);
  
  const { mutate, isPending, error: updateError } = useUpdateUser({
    onSuccess: () => {
      // Invalidate queries will be handled by the hook
    },
    onSettled: () => {
      // Navigate to the root path after all operations complete
      navigate({
        to: '/',
        replace: true  // This replaces the current entry in the history stack
      });
    }
  });

  const handleSubmit = (formData: CreateUserType) => {
    console.log('Submitting form data:', formData);
    const updateData = {
      ...formData,
      id: Number(userId)
    };
    console.log('Update data being sent:', updateData);
    mutate(updateData);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (!user) {
    console.log('EditUserFeature - No user data available');
    return <Alert severity="warning">User not found.</Alert>;
  }

  // Prepare the form data with proper typing
  const formData = {
    email: user.email || '',
    profile: {
      firstName: user.profile?.firstName || '',
      lastName: user.profile?.lastName || '',
      age: user.profile?.age,
    },
    role: user.role || 'user',
    isActive: user.isActive ?? true,
  };

  console.log('EditUserFeature - Form data prepared:', formData);
  
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit User
      </Typography>
      {updateError && <Alert severity="error">{updateError.message}</Alert>}
      <UserForm 
        onSubmit={handleSubmit} 
        isPending={isPending} 
        defaultValues={formData}
      />
    </Box>
  );
}
