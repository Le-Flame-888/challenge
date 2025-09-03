import { createFileRoute, Link } from '@tanstack/react-router';
import { useReadUser } from '@/core/users/hooks/useRead.hook';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader, 
  CircularProgress, 
  Alert, 
  Button, 
  Avatar, 
  Stack, 
  Chip, 
  Divider, 
  Paper,
  Grid
} from '@mui/material';
import { Edit as EditIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

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
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.message || 'Failed to load user details. Please try again.'}
        </Alert>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <Alert severity="warning">User not found</Alert>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  const { profile, email, role, isActive } = user;
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <Card elevation={3}>
        <CardHeader
          title={
            <Typography variant="h4" component="h1">
              {fullName}
            </Typography>
          }
          subheader={
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Chip 
                label={isActive ? 'Active' : 'Inactive'} 
                color={isActive ? 'success' : 'default'} 
                size="small" 
              />
              <Chip 
                label={role.charAt(0).toUpperCase() + role.slice(1)} 
                color="primary" 
                variant="outlined" 
                size="small" 
              />
            </Stack>
          }
          action={
            <Button
              component={Link}
              to={`/users/${userId}/edit`}
              startIcon={<EditIcon />}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          }
        />
        
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    fontSize: '3rem',
                    margin: '0 auto 16px',
                    bgcolor: 'primary.main'
                  }}
                >
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.age ? `${profile.age} years` : 'Age not specified'}
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                    <Typography>{email}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">First Name</Typography>
                    <Typography>{profile.firstName}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Last Name</Typography>
                    <Typography>{profile.lastName}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Age</Typography>
                    <Typography>{profile.age || 'Not specified'}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                    <Chip 
                      label={isActive ? 'Active' : 'Inactive'} 
                      color={isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">Role</Typography>
                    <Chip 
                      label={role.charAt(0).toUpperCase() + role.slice(1)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}