"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRecipes } from "../context/RecipeContext"
import RecipeList from "../components/recipe/RecipeList"
import { Container, Typography, Box } from "@mui/material"

const Favorites = () => {
  const { currentUser } = useAuth()
  const { recipes, loading } = useRecipes()
  const [favoriteRecipes, setFavoriteRecipes] = useState([])

  useEffect(() => {
    if (currentUser && recipes.length > 0) {
      const userFavorites = recipes.filter((recipe) => currentUser.favorites.includes(recipe.id))
      setFavoriteRecipes(userFavorites)
    }
  }, [currentUser, recipes])

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Favorite Recipes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All your saved recipes in one place
        </Typography>
      </Box>

      <RecipeList recipes={favoriteRecipes} loading={loading} emptyMessage="You haven't saved any recipes yet" />
    </Container>
  )
}

export default Favorites

