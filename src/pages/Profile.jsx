"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useRecipes } from "../context/RecipeContext"
import RecipeList from "../components/recipe/RecipeList"
import { 
  Container, Typography, Box, Paper, Avatar, 
  Tabs, Tab, Button, Chip, Divider,
  useMediaQuery, useTheme
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import FavoriteIcon from "@mui/icons-material/Favorite"
import RestaurantIcon from "@mui/icons-material/Restaurant"

const Profile = () => {
  const { currentUser } = useAuth()
  const { recipes, loading } = useRecipes()
  const [userRecipes, setUserRecipes] = useState([])
  const [favoriteRecipes, setFavoriteRecipes] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (currentUser && recipes.length > 0) {
      // Get recipes created by the user
      const created = recipes.filter((recipe) => recipe.createdBy === currentUser.username)
      setUserRecipes(created)

      // Get favorite recipes
      const favorites = recipes.filter((recipe) => currentUser.favorites.includes(recipe.id))
      setFavoriteRecipes(favorites)
    }
  }, [currentUser, recipes])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  if (!currentUser) return null

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          mb: 4,
        }}
      >
        <Box sx={{ 
          p: 3,
          backgroundColor: theme.palette.background.paper,
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            textAlign: isMobile ? 'center' : 'left',
            gap: 2,
            mb: 3,
          }}>
            <Avatar 
              sx={{ 
                width: isMobile ? 100 : 120, 
                height: isMobile ? 100 : 120, 
                bgcolor: theme.palette.secondary.main,
                fontSize: isMobile ? 40 : 48,
                boxShadow: theme.shadows[4],
              }}
            >
              {currentUser.username.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {currentUser.username}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentUser.email}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<RestaurantIcon />} 
                  label={`${userRecipes.length} Recipes`}
                  color="primary"
                  variant="outlined"
                />
                <Chip 
                  icon={<FavoriteIcon />} 
                  label={`${favoriteRecipes.length} Favorites`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Box>
            
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              component={Link} 
              to="/add-recipe"
              size="large"
              sx={{ 
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 2,
                py: 1,
                boxShadow: theme.shadows[2],
                '&:hover': {
                  boxShadow: theme.shadows[4],
                },
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              Add New Recipe
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper 
        sx={{ 
          borderRadius: '12px', 
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant={isMobile ? "fullWidth" : "standard"}
          aria-label="profile tabs"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px'
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              py: 2,
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RestaurantIcon fontSize="small" />
                <span>My Recipes</span>
              </Box>
            } 
            id="tab-0" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FavoriteIcon fontSize="small" />
                <span>Favorites</span>
              </Box>
            } 
            id="tab-1" 
          />
        </Tabs>
        
        <Divider />
        
        <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" sx={{ p: 2 }}>
          {activeTab === 0 && (
            <>
              {userRecipes.length === 0 && !loading ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    You haven't created any recipes yet
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />} 
                    component={Link} 
                    to="/add-recipe"
                    sx={{ borderRadius: '12px' }}
                  >
                    Create Your First Recipe
                  </Button>
                </Box>
              ) : (
                <RecipeList recipes={userRecipes} loading={loading} emptyMessage="You haven't created any recipes yet" />
              )}
            </>
          )}
        </Box>
        
        <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" sx={{ p: 2 }}>
          {activeTab === 1 && (
            <>
              {favoriteRecipes.length === 0 && !loading ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    You haven't saved any favorite recipes yet
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    to="/"
                    sx={{ borderRadius: '12px' }}
                  >
                    Explore Recipes
                  </Button>
                </Box>
              ) : (
                <RecipeList recipes={favoriteRecipes} loading={loading} emptyMessage="You haven't saved any recipes yet" />
              )}
            </>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default Profile