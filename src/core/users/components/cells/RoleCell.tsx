import { Chip } from '@mui/material';
import type { UserType } from '@/core/users/types/user.type';

interface RoleCellProps {
  role: UserType['role'];
}

export function RoleCell({ role }: RoleCellProps) {
  const roleColors: Record<UserType['role'], 'primary' | 'secondary' | 'default'> = {
    admin: 'primary',
    user: 'secondary',
    guest: 'default',
  };

  return (
    <Chip
      label={role.charAt(0).toUpperCase() + role.slice(1)}
      color={roleColors[role]}
      size="small"
      variant="outlined"
    />
  );
}
