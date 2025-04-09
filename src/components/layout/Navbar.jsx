"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Favorite as Heart,
  Login as LogIn,
  Logout as LogOut,
  Add as Plus,
  Person as User,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material"
import { alpha, styled } from "@mui/material/styles"

const NavLink = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 'auto',
  padding: theme.spacing(0.5, 1),
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}))

function ThemeToggle({ toggleColorMode, mode }) {
  return (
    <IconButton onClick={toggleColorMode} size="small">
      {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </IconButton>
  )
}

const Navbar = ({ toggleColorMode, mode }) => {
  const { isAuthenticated, currentUser, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleCloseUserMenu()
    navigate("/")
  }

  return (
    <AppBar 
      position="sticky" 
      color="default"
      elevation={0}
      sx={{ 
        bgcolor: "background.paper", 
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1, justifyContent: "space-between" }}>
          {/* Logo/Brand */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            FlavorExchange
          </Typography>

          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Theme Toggle */}
            <ThemeToggle toggleColorMode={toggleColorMode} mode={mode} />
            
            {isAuthenticated ? (
              <>
                {/* Favorites Link */}
                <NavLink 
                  component={Link} 
                  to="/favorites" 
                  variant="text" 
                  size="small"
                  startIcon={<Heart fontSize="small" />}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  Favorites
                </NavLink>
                
                {/* New Recipe Button */}
                <Button
                  component={Link}
                  to="/add-recipe"
                  variant="contained"
                  size="small"
                  startIcon={<Plus fontSize="small" />}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1,
                  }}
                >
                  New Recipe
                </Button>
                
                {/* User Menu */}
                <Box>
                  <Button
                    onClick={handleOpenUserMenu}
                    variant="text"
                    size="small"
                    startIcon={<User fontSize="small" />}
                    sx={{ 
                      textTransform: 'none',
                      color: "text.primary" 
                    }}
                  >
                    {isMobile ? '' : currentUser?.username}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      elevation: 2,
                      sx: { 
                        minWidth: 150,
                        mt: 1,
                      }
                    }}
                  >
                    <MenuItem 
                      component={Link} 
                      to="/profile" 
                      onClick={handleCloseUserMenu}
                    >
                      <User fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogOut fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              // Login Button
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="small"
                startIcon={<LogIn fontSize="small" />}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 1,
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
