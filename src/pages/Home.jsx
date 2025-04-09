import { useRecipes } from "../context/RecipeContext"
import RecipeList from "../components/recipe/RecipeList"
import SearchBar from "../components/layout/SearchBar"
import { Box, Typography, Container, Paper, useTheme, alpha } from "@mui/material"

const Home = () => {
  const { loading, filteredRecipes, searchTerm, dietaryFilters } = useRecipes()
  const theme = useTheme()

  const getTitle = () => {
    if (searchTerm && dietaryFilters.length > 0) {
      return `Search Results for "${searchTerm}" with ${dietaryFilters.join(", ")} filters`
    } else if (searchTerm) {
      return `Search Results for "${searchTerm}"`
    } else if (dietaryFilters.length > 0) {
      return `Recipes with ${dietaryFilters.join(", ")} filters`
    } else {
      return "All Recipes"
    }
  }

  const getEmptyMessage = () => {
    return searchTerm || dietaryFilters.length > 0 
      ? `No recipes found matching your criteria` 
      : "No recipes available"
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          mb: 6, 
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Discover Delicious Recipes
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            maxWidth: "600px",
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: "0.9rem", sm: "1rem" }
          }}
        >
          Find and share your favorite recipes with our community
        </Typography>

        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3 },
            width: "100%",
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(8px)",
            border: `none`,
          }}
        >
          <SearchBar />
        </Paper>
      </Box>

      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          fontWeight: 600, 
          mb: 3,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: 60,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: theme.palette.primary.main,
          }
        }}
      >
        {getTitle()}
      </Typography>

      <RecipeList
        recipes={filteredRecipes}
        loading={loading}
        emptyMessage={getEmptyMessage()}
      />
    </Container>
  )
}

export default Home
