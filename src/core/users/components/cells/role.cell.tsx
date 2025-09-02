import type { UserRole } from "@/core/users/consts/roles.enum";
import Chip from "@mui/material/Chip";
import FaceIcon from '@mui/icons-material/Face';

// Roles should be mapped to colors and icons as needed

export function RenderRole(role: UserRole) {
  return <Chip icon={<FaceIcon />} label={role.toUpperCase()} variant="outlined" color="error" style={{ fontWeight: 'bold' }} />;
}