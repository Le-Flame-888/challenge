import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, type CreateUserType } from '@/core/users/api/create.api';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

import type { UserType } from '@/core/users/schemas/user.schema';

interface CreateUserFormProps {
  onSubmit: (data: CreateUserType) => void;
  isLoading: boolean;
  defaultValues?: UserType;
}

export function CreateUserForm({ onSubmit, isLoading, defaultValues }: CreateUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: defaultValues?.email || '',
      profile: {
        firstName: defaultValues?.profile.firstName || '',
        lastName: defaultValues?.profile.lastName || '',
        age: defaultValues?.profile.age || undefined,
      },
      role: defaultValues?.role || 'user',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="First Name"
          {...register('profile.firstName')}
          error={!!errors.profile?.firstName}
          helperText={errors.profile?.firstName?.message}
        />
        <TextField
          label="Last Name"
          {...register('profile.lastName')}
          error={!!errors.profile?.lastName}
          helperText={errors.profile?.lastName?.message}
        />
        <TextField
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Age"
          type="number"
          {...register('profile.age', { valueAsNumber: true })}
          error={!!errors.profile?.age}
          helperText={errors.profile?.age?.message}
        />
        <FormControl fullWidth error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Select label="Role" {...register('role')}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="guest">Guest</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create User'}
        </Button>
      </Box>
    </form>
  );
}
