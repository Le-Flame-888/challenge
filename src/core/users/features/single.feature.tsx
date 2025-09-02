import { useParams } from '@tanstack/react-router';
import { useReadUser } from '@/core/users/hooks/useRead.hook';
import { UserProfile } from '@/core/users/components/UserProfile';
import { Box, CircularProgress, Alert, Button, Stack, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export function SingleUserFeature() {
  const { userId } = useParams({ from: '/$userId/' });
  const { data, isLoading, isError, error } = useReadUser(Number(userId));
  const user = data?.data;

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
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h1">
            User Profile
          </Typography>
          <Link to="/$userId/edit" params={{ userId: String(user.id) }}>
            <Button variant="contained">Edit User</Button>
          </Link>
        </Stack>
        <UserProfile user={user} />
      </Stack>
    </Box>
  );
}
