import RecipeForm from "../components/recipe/RecipeForm"
import { Container, Typography, Box } from "@mui/material"

const AddRecipe = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Share Your Recipe
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Fill in the details below to share your culinary creation with the community
        </Typography>
      </Box>
      <RecipeForm />
    </Container>
  )
}

export default AddRecipe

