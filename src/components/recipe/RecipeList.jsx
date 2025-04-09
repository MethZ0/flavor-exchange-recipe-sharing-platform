import { Grid, Typography, Box, CircularProgress } from "@mui/material"
import RecipeCard from "./RecipeCard"
import { useEffect } from "react"

const RecipeList = ({ recipes, loading, title, emptyMessage }) => {
  // Add debug logging
  useEffect(() => {
    if (recipes && recipes.length > 0) {
      console.log("Recipes in RecipeList:", recipes)
      console.log("First recipe details:", recipes[0])
    }
  }, [recipes])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h6" color="text.secondary">
          {emptyMessage || "No recipes found"}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RecipeList