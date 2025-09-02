import { CreateUserForm } from '@/core/users/forms/CreateUser.form';
import { useReadUser } from '@/core/users/hooks/useRead.hook';
import { useUpdateUser } from '@/core/users/hooks/useUpdate.hook';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import type { CreateUserType } from '../api/create.api';

export function UpdateUserFeature() {
  const { userId } = useParams({ from: '/$userId/edit' });
  const navigate = useNavigate();
  const { data: user, isLoading: isLoadingUser } = useReadUser(Number(userId));
  const { mutate, isPending, error } = useUpdateUser();

  const handleSubmit = (data: CreateUserType) => {
    mutate({ id: Number(userId), ...data }, {
      onSuccess: () => {
        navigate({ to: '/' });
      },
    });
  };

  if (isLoadingUser) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit User
      </Typography>
      {error && <Alert severity="error">{error.message}</Alert>}
      {user && <CreateUserForm onSubmit={handleSubmit} isLoading={isPending} defaultValues={user} />}
    </Box>
  );
}
