import { UsersTable } from "@/core/users/components/table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from 'react';
import type { GridPaginationModel } from '@mui/x-data-grid';
import { useListUsers } from '../hooks/useList.hook';
import { useDebounce } from '@/packages/hooks/useDebounce.hook';
import { UsersTableSkeleton } from "@/core/users/components/table.skeleton";
import { UserSearch } from '../components/UserSearch';
import type { UserType } from '@/core/users/types/user.type';

export function ListUsersFeature() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [roleFilter, setRoleFilter] = useState<UserType['role'] | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<boolean | 'all'>('all');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data, isLoading, isFetching } = useListUsers({
    search: debouncedSearchQuery,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    role: roleFilter === 'all' ? null : roleFilter,
    isActive: statusFilter === 'all' ? null : statusFilter,
  });

  const users = data?.data ?? [];
  const rowCount = data?.total ?? 0;

  // Reset to first page when filters change
  useEffect(() => {
    if (!isInitialLoad) {
      setPaginationModel(prev => ({ ...prev, page: 0 }));
    } else {
      setIsInitialLoad(false);
    }
  }, [debouncedSearchQuery, roleFilter, statusFilter]);

  const handleSearch = useCallback((search: string) => {
    setSearchQuery(search);
  }, []);

  const handleRoleFilter = useCallback((role: UserType['role'] | 'all') => {
    setRoleFilter(role);
  }, []);

  const handleStatusFilter = useCallback((status: boolean | 'all') => {
    setStatusFilter(status);
  }, []);

  if (isLoading && !data) {
    return (
      <Container>
        <UsersTableSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={0.5}>
            <h1 className="text-2xl font-bold">Users</h1>
            <span>List of all users</span>
          </Stack>
          <Link to={'/create'}>
            <Button variant="contained">Add User</Button>
          </Link>
        </Stack>
        
        <UserSearch 
          onSearch={handleSearch}
          onRoleFilter={handleRoleFilter}
          onStatusFilter={handleStatusFilter}
          searchValue={searchQuery}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          isLoading={isFetching}
        />

        <UsersTable 
          users={users} 
          isLoading={isLoading || isFetching}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Stack>
    </Container>
  );
}