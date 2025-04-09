import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext'
import { useAuth } from '../context/AuthContext'
import CookingTimer from '../components/recipe/CookingTimer'
import IngredientSubstitutions from '../components/recipe/IngredientSubstitutions'
import SocialShare from '../components/recipe/SocialShare'
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Grid,
  Slide,
  Fade,
  useTheme,
  alpha,
  Stack,
  Tooltip,
  ListItemIcon,
  styled
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

// Custom styled components using Material UI's styling system
const RecipeCard = styled(Card)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(5),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[8]
  }
}))

const RecipeImage = styled(CardMedia)(({ theme }) => ({
  height: 400,
  objectFit: 'cover',
  objectPosition: 'center',
  width: '100%',
  filter: 'brightness(0.85)',
  [theme.breakpoints.up('md')]: {
    height: 500
  }
}))

const TitleOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(4),
  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.1) 100%)',
  color: 'white',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2)
  }
}))

const RecipeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: 'white',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem'
  }
}))

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(0.75, 3),
  transition: 'all 0.3s ease'
}))

const EditActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    transform: 'scale(1.05)'
  }
}))

const DeleteActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.2),
    transform: 'scale(1.05)'
  }
}))

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecipeById, deleteRecipe } = useRecipes()
  const { currentUser, addToFavorites, removeFromFavorites, isAuthenticated } = useAuth()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const theme = useTheme()
  
  const recipe = getRecipeById(id)
  
  if (!recipe) {
    return (
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Recipe not found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            The recipe you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            size="large"
            sx={{ 
              borderRadius: 50, 
              px: 3, 
              py: 1
            }}
          >
            Back to Recipes
          </Button>
        </Box>
      </Container>
    )
  }
  
  const isFavorite = currentUser?.favorites?.includes(recipe.id)
  const isOwner = currentUser?.username === recipe.createdBy
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe.id)
    }
  }
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
  }
  
  const handleDeleteConfirm = () => {
    deleteRecipe(recipe.id)
    setDeleteDialogOpen(false)
    navigate('/')
  }
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }
  
  // Helper function to determine difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'success'
      case 'Medium': return 'warning'
      case 'Hard': return 'error'
      default: return 'default'
    }
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />}
        sx={{ 
          mb: 2, 
          color: theme.palette.text.secondary,
          borderRadius: 50,
          px: 2,
          py: 0.75,
          '&:hover': {
            bgcolor: alpha(theme.palette.action.hover, 0.8)
          },
          transition: 'all 0.3s ease'
        }}
      >
        Back to Recipes
      </Button>
      
      <Fade in timeout={500}>
        <RecipeCard>
          {/* Hero Image with Overlay */}
          <Box sx={{ position: 'relative' }}>
            <RecipeImage
              component="img"
              image={recipe.imageUrl || "/placeholder.svg"}
              alt={recipe.title}
            />
            
            {/* Title Overlay */}
            <TitleOverlay>
              <RecipeTitle variant="h3" component="h1">
                {recipe.title}
              </RecipeTitle>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Rating 
                  value={recipe.rating} 
                  precision={0.1} 
                  readOnly 
                  sx={{ 
                    color: theme.palette.warning.light,
                    '& .MuiRating-iconEmpty': {
                      color: alpha('#fff', 0.5)
                    }
                  }}
                />
                <Typography variant="body1" sx={{ ml: 1, color: 'white', opacity: 0.9 }}>
                  ({recipe.rating})
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1, 
                  color: 'white',
                  fontWeight: 500,
                  textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Created by {recipe.createdBy}
              </Typography>
            </TitleOverlay>
          </Box>
          
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 1 }}>
              {isAuthenticated && (
                <ActionButton
                  variant={isFavorite ? "contained" : "outlined"}
                  color={isFavorite ? "secondary" : "primary"}
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite ? 'Saved' : 'Save Recipe'}
                </ActionButton>
              )}
              
              {isOwner && (
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Edit Recipe">
                    <EditActionButton 
                      component={Link} 
                      to={`/edit-recipe/${recipe.id}`}
                      color="primary"
                      aria-label="edit recipe"
                    >
                      <EditIcon />
                    </EditActionButton>
                  </Tooltip>
                  <Tooltip title="Delete Recipe">
                    <DeleteActionButton 
                      onClick={handleDeleteClick}
                      color="error"
                      aria-label="delete recipe"
                    >
                      <DeleteIcon />
                    </DeleteActionButton>
                  </Tooltip>
                </Stack>
              )}
            </Box>
            
            {/* Recipe Description */}
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                fontSize: '1.125rem',
                lineHeight: 1.7,
                mb: 3
              }}
            >
              {recipe.description}
            </Typography>
            
            {/* Recipe Info Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip 
                icon={<AccessTimeIcon />} 
                label={`${recipe.cookingTime} mins`} 
                variant="outlined"
                sx={{ borderRadius: 50, py: 0.5 }}
              />
              <Chip 
                icon={<RestaurantIcon />} 
                label={`${recipe.servings} servings`} 
                variant="outlined"
                sx={{ borderRadius: 50, py: 0.5 }}
              />
              <Chip 
                label={recipe.difficulty} 
                variant="filled" 
                color={getDifficultyColor(recipe.difficulty)}
                sx={{ borderRadius: 50, py: 0.5 }}
              />
              {recipe.dietaryTags && recipe.dietaryTags.map(tag => (
                <Chip 
                  key={tag}
                  label={tag}
                  color="primary"
                  size="small"
                  sx={{ borderRadius: 50 }}
                />
              ))}
            </Box>
            
            {/* Social Sharing */}
            <Box sx={{ mb: 3 }}>
              <SocialShare recipe={recipe} />
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Cooking Timer */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 4, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `none`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[2]
                }
              }}
            >
              <CookingTimer defaultMinutes={recipe.cookingTime} />
            </Paper>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Recipe Content */}
            <Grid container spacing={6}>
              {/* Ingredients */}
              <Grid item xs={12} md={5}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Ingredients
                </Typography>
                
                {/* Ingredient Substitutions */}
                {recipe.substitutions && Object.keys(recipe.substitutions).length > 0 && (
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      mb: 3, 
                      borderRadius: theme.shape.borderRadius * 2,
                      bgcolor: alpha(theme.palette.info.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                    }}
                  >
                    <IngredientSubstitutions 
                      ingredients={recipe.ingredients} 
                      substitutions={recipe.substitutions} 
                    />
                  </Paper>
                )}
                
                <List sx={{ pl: 0 }}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListItem 
                      key={index} 
                      disablePadding 
                      sx={{ 
                        py: 1.5,
                        borderBottom: index < recipe.ingredients.length - 1 
                          ? `1px solid ${alpha(theme.palette.divider, 0.5)}` 
                          : 'none'
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon 
                          color="primary" 
                          fontSize="small"
                          sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)'
                            }
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 400 }}>
                            {ingredient}
                          </Typography>
                        } 
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              {/* Instructions */}
              <Grid item xs={12} md={7}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  Instructions
                </Typography>
                
                <List>
                  {recipe.instructions.map((instruction, index) => (
                    <ListItem 
                      key={index} 
                      alignItems="flex-start"
                      sx={{ 
                        py: 2,
                        px: 0
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            mr: 2,
                            width: 40,
                            height: 40,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.25),
                              transform: 'scale(1.05)'
                            }
                          }}
                        >
                          {index + 1}
                        </Avatar>
                        <ListItemText 
                          primary={
                            <Typography 
                              variant="body1" 
                              component="div"
                              sx={{ 
                                color: theme.palette.text.primary,
                                lineHeight: 1.6
                              }}
                            >
                              {instruction}
                            </Typography>
                          }
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </RecipeCard>
      </Fade>
      
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        PaperProps={{
          sx: { borderRadius: theme.shape.borderRadius * 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleDeleteCancel} 
            variant="outlined"
            sx={{ borderRadius: 50, px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: 50, px: 3, ml: 1 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default RecipeDetails