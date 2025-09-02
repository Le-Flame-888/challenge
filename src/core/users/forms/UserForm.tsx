import { useState, useEffect } from 'react';
import { Button, Stack, FormControlLabel, Box, MenuItem, TextField, Switch } from '@mui/material';
import type { CreateUserType } from '@/core/users/types/user.type';

interface UserFormProps {
  onSubmit: (data: CreateUserType) => void;
  isPending: boolean;
  defaultValues?: Partial<CreateUserType>;
}

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
];

export function UserForm({ onSubmit, isPending, defaultValues }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserType>({
    profile: {
      firstName: '',
      lastName: '',
      age: undefined,
    },
    email: '',
    role: 'user',
    isActive: false,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        profile: {
          firstName: defaultValues.profile?.firstName || '',
          lastName: defaultValues.profile?.lastName || '',
          age: defaultValues.profile?.age || undefined,
        },
        email: defaultValues.email || '',
        role: defaultValues.role || 'user',
        isActive: defaultValues.isActive || false,
      });
    }
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent as keyof typeof prev], [child]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            name="profile.firstName"
            label="First Name"
            value={formData.profile.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="profile.lastName"
            label="Last Name"
            value={formData.profile.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="profile.age"
          label="Age (Optional)"
          type="number"
          value={formData.profile.age || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="role"
          label="Role"
          select
          value={formData.role}
          onChange={handleChange}
          fullWidth
        >
          {roleOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={<Switch name="isActive" checked={formData.isActive} onChange={handleChange} />}
          label="Active"
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </Stack>
    </Box>
  );
}
