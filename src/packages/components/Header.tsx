import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '@/packages/theme/ThemeProvider';
import { Link } from '@tanstack/react-router';

export default function Header() {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            User Management
          </Link>
        </Typography>
        <Link to="/create">
          <Button color="inherit" style={{ color: 'white' }}>Add User</Button>
        </Link>
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
