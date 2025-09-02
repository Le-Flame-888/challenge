import UsersColumns from "@/core/users/consts/table.def";
import { useListUsers } from "@/core/users/hooks/useList.hook";
import { DataGrid } from "@mui/x-data-grid";
export function UsersTable() {
  const {
    data,
    isLoading,
  } = useListUsers();

  return (
    <DataGrid
      loading={isLoading}
      rows={isLoading ? [] : data}
      columns={UsersColumns}
      disableColumnResize
      slotProps={{
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'skeleton',
        },
      }}
    />);
}