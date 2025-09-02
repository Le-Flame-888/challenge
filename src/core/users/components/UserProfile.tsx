import { Card, CardContent, Typography, Avatar, Chip, Stack, Box } from '@mui/material';
import type { UserType } from '@/core/users/types/user.type';

interface UserProfileProps {
  user: UserType;
}

export function UserProfile({ user }: UserProfileProps) {
  const { profile, email, role, isActive } = user;

  return (
    <Card>
      <CardContent>
        <Stack spacing={3} alignItems="center">
          <Avatar sx={{ width: 100, height: 100, fontSize: '2.5rem' }}>
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </Avatar>
          <Box textAlign="center">
            <Typography variant="h4" component="h1">
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {email}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Chip label={role.charAt(0).toUpperCase() + role.slice(1)} color={role === 'admin' ? 'primary' : 'secondary'} />
            <Chip label={isActive ? 'Active' : 'Inactive'} color={isActive ? 'success' : 'error'} variant="outlined" />
          </Stack>
          {profile.age && (
            <Typography variant="body2" color="text.secondary">
              Age: {profile.age}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
