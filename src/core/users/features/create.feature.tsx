import { UserForm } from '@/core/users/forms/UserForm';
import { useCreateUser } from '@/core/users/hooks/useCreate.hook';
import { useNavigate } from '@tanstack/react-router';
import { Box, Typography, Alert } from '@mui/material';
import type { CreateUserType } from '../api/create.api';

export function CreateUserFeature() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateUser();

  const handleSubmit = (data: CreateUserType) => {
    mutate(data, {
      onSuccess: () => {
        navigate({ to: '/' });
      },
    });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create User
      </Typography>
      {error && <Alert severity="error">{error.message}</Alert>}
      <UserForm onSubmit={handleSubmit} isPending={isPending} />
    </Box>
  );
}
