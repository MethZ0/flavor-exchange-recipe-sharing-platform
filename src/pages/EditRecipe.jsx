"use client"

import { useParams, Navigate } from "react-router-dom"
import { useRecipes } from "../context/RecipeContext"
import { useAuth } from "../context/AuthContext"
import RecipeForm from "../components/recipe/RecipeForm"
import { Container, Typography, Box, CircularProgress } from "@mui/material"

const EditRecipe = () => {
  const { id } = useParams()
  const { getRecipeById, loading } = useRecipes()
  const { currentUser } = useAuth()

  const recipe = getRecipeById(id)

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!recipe) {
    return <Navigate to="/" replace />
  }

  // Check if current user is the creator of the recipe
  if (recipe.createdBy !== currentUser?.username) {
    return <Navigate to={`/recipe/${id}`} replace />
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Recipe
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update your recipe details below
        </Typography>
      </Box>
      <RecipeForm initialData={recipe} isEditing={true} />
    </Container>
  )
}

export default EditRecipe

