import { createFileRoute } from '@tanstack/react-router';
import { useReadUser } from '@/core/users/hooks/useRead.hook';
import { Box, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';

export const Route = createFileRoute('/$userId/')({
  component: UserDetailComponent,
});

function UserDetailComponent() {
  const { userId } = Route.useParams();
  const { data: user, isLoading, isError, error } = useReadUser(Number(userId));

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

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Details
          </Typography>
          {user && (
            <Box>
              <Typography variant="h6">ID: {user.id}</Typography>
              <Typography variant="h6">Name: {user.profile.firstName} {user.profile.lastName}</Typography>
              <Typography variant="h6">Email: {user.email}</Typography>
              <Typography variant="h6">Age: {user.profile.age || 'N/A'}</Typography>
              <Typography variant="h6">Role: {user.role}</Typography>
              <Typography variant="h6">Status: {user.isActive ? 'Active' : 'Inactive'}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
