import { useState, type ChangeEvent, useEffect } from 'react';
import { InputAdornment, TextField, Box, IconButton, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { UserType } from '@/core/users/types/user.type';

interface UserSearchProps {
  onSearch: (search: string) => void;
  onRoleFilter: (role: UserType['role'] | 'all') => void;
  onStatusFilter: (isActive: boolean | 'all') => void;
  searchValue: string;
  roleFilter: UserType['role'] | 'all';
  statusFilter: boolean | 'all';
  isLoading?: boolean;
}

export function UserSearch({
  onSearch,
  onRoleFilter,
  onStatusFilter,
  searchValue,
  roleFilter,
  statusFilter,
  isLoading = false,
}: UserSearchProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  // Sync local state with props
  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    onSearch('');
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    onRoleFilter(e.target.value as UserType['role'] | 'all');
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    onStatusFilter(value === 'all' ? 'all' : value === 'active');
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Box component="form" onSubmit={handleSearchSubmit} sx={{ flex: 1, minWidth: 250 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by email..."
          value={localSearch}
          onChange={handleSearchChange}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: localSearch && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClearSearch}
                  disabled={isLoading}
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel id="role-filter-label">Role</InputLabel>
        <Select
          labelId="role-filter-label"
          id="role-filter"
          value={roleFilter}
          label="Role"
          onChange={handleRoleChange}
          disabled={isLoading}
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={statusFilter === 'all' ? 'all' : statusFilter ? 'active' : 'inactive'}
          label="Status"
          onChange={handleStatusChange}
          disabled={isLoading}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
