import { UsersTable } from "@/core/users/components/table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Link } from "@tanstack/react-router";

export function ListUsersFeature() {
  return <Container>
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <h1 className="text-2xl font-bold">Users</h1>
          <span>List of all users</span>
        </Stack>
        <Link to={'/create'}>
          <Button variant="contained" className="self-end">Add User</Button>
        </Link>
      </Stack>
      <Divider />
      <UsersTable />
    </Stack>
  </Container>;
}