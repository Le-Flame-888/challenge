import { UsersTable } from "@/core/users/components/table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link } from "@tanstack/react-router";
import { useState } from 'react';
import type { GridPaginationModel } from '@mui/x-data-grid';
import { useListUsers } from '../hooks/useList.hook';
import { useDebounce } from '@/packages/hooks/useDebounce.hook';
import { UsersTableSkeleton } from "@/core/users/components/table.skeleton";
import { UserFilters } from '../components/UserFilters';
import type { UserType } from '@/core/users/types/user.type';
import type { SelectChangeEvent } from '@mui/material';

export function ListUsersFeature() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [roleFilter, setRoleFilter] = useState<UserType['role'] | ''>('');
  const [isActiveFilter, setIsActiveFilter] = useState('');

  const { data, isLoading } = useListUsers({
    search: debouncedSearchQuery,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    role: roleFilter || null,
    isActive: isActiveFilter === '' ? null : isActiveFilter === 'true',
  });

  const users = data?.data ?? [];
  const rowCount = data?.total ?? 0;

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRoleFilter(event.target.value as UserType['role'] | '');
  };

  const handleIsActiveChange = (event: SelectChangeEvent<string>) => {
    setIsActiveFilter(event.target.value);
  };

  if (isLoading && !data) {
    return (
      <Container>
        <UsersTableSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={0.5}>
            <h1 className="text-2xl font-bold">Users</h1>
            <span>List of all users</span>
          </Stack>
          <Link to={'/create'}>
            <Button variant="contained">Add User</Button>
          </Link>
        </Stack>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <UserFilters 
          role={roleFilter} 
          isActive={isActiveFilter} 
          onRoleChange={handleRoleChange} 
          onIsActiveChange={handleIsActiveChange} 
        />
        <Divider />
        <UsersTable 
          users={users} 
          isLoading={isLoading}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Stack>
    </Container>
  );
}