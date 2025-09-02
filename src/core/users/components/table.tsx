import { useDeleteUser } from "@/core/users/hooks/useDelete.hook";
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import { Avatar, Button, Stack } from "@mui/material";
import { ConfirmationDialog } from '@/packages/components/dialogs/Confirmation.dialog';
import { useState } from 'react';
import { useNavigate } from "@tanstack/react-router";
import type { UserType } from "@/core/users/types/user.type";
import { RoleCell } from './cells/RoleCell';

interface UsersTableProps {
  users: UserType[];
  isLoading: boolean;
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
}

export function UsersTable({
  users,
  isLoading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
}: UsersTableProps) {
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => {
    setSelectedUserId(id);
    setDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedUserId(null);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId, {
        onSuccess: () => closeDeleteDialog(),
      });
    }
  };

  const columns: GridColDef<UserType>[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Avatar>
          {params.row.profile.firstName.charAt(0)}
          {params.row.profile.lastName.charAt(0)}
        </Avatar>
      ),
    },
    { 
      field: 'name', 
      headerName: 'Full Name', 
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => `${params.row.profile.firstName} ${params.row.profile.lastName}` 
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 2,
      minWidth: 200 
    },
    { 
      field: 'role', 
      headerName: 'Role', 
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => <RoleCell role={params.value} />
    },
    {
      field: 'actions', 
      align: 'center', 
      headerName: 'Actions', 
      width: 200,
      minWidth: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant='contained' size="small" onClick={() => navigate({ to: `/${params.row.id}/edit` })}>
            Edit
          </Button>
          <Button variant='outlined' size="small" onClick={() => openDeleteDialog(params.row.id)}>
            Delete
          </Button>
        </Stack>
      )
    },
  ];

  return (
    <>
      <DataGrid
      loading={isLoading}
      rows={users}
      columns={columns}
      disableColumnResize
      autoHeight
      paginationMode="server"
      rowCount={rowCount}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      slotProps={{
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'skeleton',
        },
      }}
    />
      <ConfirmationDialog
        open={dialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
}