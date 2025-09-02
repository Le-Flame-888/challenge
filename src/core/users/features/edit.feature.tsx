import { useParams } from '@tanstack/react-router';
import { useReadUser } from '@/core/users/hooks/useRead.hook';
import { useUpdateUser } from '@/core/users/hooks/useUpdate.hook';
import { UserForm } from '@/core/users/forms/UserForm';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import type { CreateUserType } from '../api/create.api';

export function EditUserFeature() {
  const { userId } = useParams({ from: '/$userId/edit' });
  const { data, isLoading, isError, error } = useReadUser(Number(userId));
  const { mutate, isPending, error: updateError } = useUpdateUser();

  const user = data?.data;

  const handleSubmit = (data: CreateUserType) => {
    mutate({ userId: Number(userId), ...data });
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
    return <Alert severity="warning">User not found.</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit User
      </Typography>
      {updateError && <Alert severity="error">{updateError.message}</Alert>}
      <UserForm onSubmit={handleSubmit} isPending={isPending} defaultValues={user} />
    </Box>
  );
}
