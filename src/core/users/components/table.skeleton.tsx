import { Skeleton, Stack, Box } from '@mui/material';

export function UsersTableSkeleton() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Skeleton variant="text" width={150} height={40} />
          <Skeleton variant="text" width={100} height={20} />
        </Stack>
        <Skeleton variant="rectangular" width={100} height={40} />
      </Stack>
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Box sx={{ height: 400, width: '100%' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    </Stack>
  );
}
