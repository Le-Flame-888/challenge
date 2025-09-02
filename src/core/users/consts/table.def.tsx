import { RenderRole } from '@/core/users/components/cells/role.cell';
import type { UserType } from '@/core/users/types/user.type';
import { dateTimeRender } from '@/packages/components/cells/dateRender';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { GridColDef } from '@mui/x-data-grid';

const UsersColumns: GridColDef<UserType>[] = [
  { 
    field: 'name', 
    headerName: 'Full Name', 
    flex: 1.5, // Takes more space for names
    minWidth: 150,
    renderCell: (params) => params.row.profile.firstName + ' ' + params.row.profile.lastName 
  },
  { 
    field: 'email', 
    headerName: 'Email', 
    flex: 2, // Takes more space for emails
    minWidth: 200 
  },
  { 
    field: 'role', 
    headerName: 'Role', 
    flex: 0.8, // Takes less space for roles
    minWidth: 100,
    renderCell: (params) => RenderRole(params.value)
  },
  {
    field: 'actions', 
    align: 'center', 
    headerName: 'Actions', 
    width: 200, // Fixed width for actions (not flex)
    minWidth: 200,
    maxWidth: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <Stack direction="row" spacing={1} justifyContent={'center'} height="100%" alignItems={'center'}>
        <Button variant='contained' size="small">Edit</Button>
        <Button variant='outlined' size="small">Delete</Button>
      </Stack>
    )
  },
];

export default UsersColumns;