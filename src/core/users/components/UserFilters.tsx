import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { UserType } from '@/core/users/types/user.type';

interface UserFiltersProps {
  role: UserType['role'] | '';
  isActive: string;
  onRoleChange: (event: SelectChangeEvent<string>) => void;
  onIsActiveChange: (event: SelectChangeEvent<string>) => void;
}

const roleOptions: { value: UserType['role']; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
];

const statusOptions = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

export function UserFilters({ role, isActive, onRoleChange, onIsActiveChange }: UserFiltersProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select value={role} label="Role" onChange={onRoleChange}>
          <MenuItem value=""><em>All Roles</em></MenuItem>
          {roleOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={isActive} label="Status" onChange={onIsActiveChange}>
          <MenuItem value=""><em>All Statuses</em></MenuItem>
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
