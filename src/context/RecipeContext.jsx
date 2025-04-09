"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { mockRecipes } from "../data/mockData"

const RecipeContext = createContext()

export const useRecipes = () => useContext(RecipeContext)

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [dietaryFilters, setDietaryFilters] = useState([])
  const [availableDietaryTags, setAvailableDietaryTags] = useState([])
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [sortOption, setSortOption] = useState("newest") // Options: "newest", "rating", "cookingTime"

  useEffect(() => {
    // Force reset localStorage to ensure clean data
    localStorage.removeItem("recipes")
    
    // Always use mock data for initial load to ensure correct fields
    setRecipes(mockRecipes)
    localStorage.setItem("recipes", JSON.stringify(mockRecipes))
    setLoading(false)
  }, [])

  useEffect(() => {
    // Extract all unique dietary tags from recipes
    if (recipes.length > 0) {
      const allTags = recipes.reduce((tags, recipe) => {
        if (recipe.dietaryTags && Array.isArray(recipe.dietaryTags)) {
          recipe.dietaryTags.forEach((tag) => {
            if (!tags.includes(tag)) {
              tags.push(tag)
            }
          })
        }
        return tags
      }, [])
      setAvailableDietaryTags(allTags.sort())
    }
  }, [recipes])

  useEffect(() => {
    let filtered = [...recipes]

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term) ||
          recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(term))
      )
    }

    // Apply dietary filters
    if (dietaryFilters.length > 0) {
      filtered = filtered.filter(
        (recipe) => recipe.dietaryTags && dietaryFilters.every((filter) => recipe.dietaryTags.includes(filter))
      )
    }

    // Apply difficulty filter
    if (difficultyFilter) {
      filtered = filtered.filter((recipe) => recipe.difficulty === difficultyFilter)
    }

    // Apply sorting
    filtered = sortRecipes(filtered, sortOption)

    setFilteredRecipes(filtered)
  }, [searchTerm, recipes, dietaryFilters, difficultyFilter, sortOption])

  const sortRecipes = (recipesToSort, option) => {
    switch (option) {
      case "newest":
        return [...recipesToSort].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case "rating":
        return [...recipesToSort].sort((a, b) => b.rating - a.rating)
      case "cookingTime":
        return [...recipesToSort].sort((a, b) => a.cookingTime - b.cookingTime)
      default:
        return recipesToSort
    }
  }

  const getRecipeById = (id) => {
    return recipes.find((recipe) => recipe.id === id)
  }

  const addRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      dietaryTags: newRecipe.dietaryTags || [],
      rating: newRecipe.rating || 0,
      createdBy: newRecipe.createdBy || "user",
    }

    const updatedRecipes = [...recipes, recipeWithId]
    setRecipes(updatedRecipes)
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes))
    return recipeWithId
  }

  const updateRecipe = (id, updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
    setRecipes(updatedRecipes)
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes))
    return updatedRecipes.find(recipe => recipe.id === id)
  }

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
    setRecipes(updatedRecipes)
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes))
  }

  const resetFilters = () => {
    setSearchTerm("")
    setDietaryFilters([])
    setDifficultyFilter("")
    setSortOption("newest")
  }

  const value = {
    recipes,
    loading,
    searchTerm,
    setSearchTerm,
    filteredRecipes,
    dietaryFilters,
    setDietaryFilters,
    difficultyFilter,
    setDifficultyFilter,
    sortOption,
    setSortOption,
    availableDietaryTags,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    resetFilters,
  }

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}