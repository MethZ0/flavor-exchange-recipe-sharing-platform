"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useRecipes } from "../../context/RecipeContext"
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Paper,
  Divider,
  IconButton,
  Chip,
  Autocomplete,
  Tab,
  Tabs,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"

const difficultyLevels = ["Easy", "Medium", "Hard"]
const commonDietaryTags = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "nut-free",
  "keto",
  "paleo",
  "low-carb",
  "low-fat",
]

const RecipeForm = ({ initialData, isEditing = false }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { addRecipe, updateRecipe, availableDietaryTags } = useRecipes()

  const allDietaryTags = [...new Set([...commonDietaryTags, ...(availableDietaryTags || [])])].sort()

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    cookingTime: initialData?.cookingTime || "",
    servings: initialData?.servings || "",
    difficulty: initialData?.difficulty || "Medium",
    ingredients: initialData?.ingredients || [""],
    instructions: initialData?.instructions || [""],
    imageUrl: initialData?.imageUrl || "",
    dietaryTags: initialData?.dietaryTags || [],
    substitutions: initialData?.substitutions || {},
  })

  const [errors, setErrors] = useState({})
  const [substitutionIngredient, setSubstitutionIngredient] = useState("")
  const [substitutionValue, setSubstitutionValue] = useState("")
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.cookingTime) newErrors.cookingTime = "Cooking time is required"
    if (!formData.servings) newErrors.servings = "Servings is required"
    if (!formData.difficulty) newErrors.difficulty = "Difficulty is required"
    if (formData.ingredients.some((ing) => !ing.trim())) newErrors.ingredients = "All ingredients must be filled"
    if (formData.instructions.some((inst) => !inst.trim())) newErrors.instructions = "All instructions must be filled"
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleIngredientChange = (index, value) => {
    const updated = [...formData.ingredients]
    updated[index] = value
    setFormData((prev) => ({ ...prev, ingredients: updated }))
    if (errors.ingredients) {
      setErrors((prev) => ({ ...prev, ingredients: undefined }))
    }
  }

  const handleInstructionChange = (index, value) => {
    const updated = [...formData.instructions]
    updated[index] = value
    setFormData((prev) => ({ ...prev, instructions: updated }))
    if (errors.instructions) {
      setErrors((prev) => ({ ...prev, instructions: undefined }))
    }
  }

  const addIngredient = () => {
    setFormData((prev) => ({ ...prev, ingredients: [...prev.ingredients, ""] }))
  }

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const filtered = formData.ingredients.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, ingredients: filtered }))
    }
  }

  const addInstruction = () => {
    setFormData((prev) => ({ ...prev, instructions: [...prev.instructions, ""] }))
  }

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const filtered = formData.instructions.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, instructions: filtered }))
    }
  }

  const handleDietaryTagsChange = (_, newValue) => {
    setFormData((prev) => ({ ...prev, dietaryTags: newValue }))
  }

  const handleAddSubstitution = () => {
    if (!substitutionIngredient.trim() || !substitutionValue.trim()) return
    const newSubs = { ...formData.substitutions }

    if (newSubs[substitutionIngredient]) {
      if (!newSubs[substitutionIngredient].includes(substitutionValue)) {
        newSubs[substitutionIngredient] = [...newSubs[substitutionIngredient], substitutionValue]
      }
    } else {
      newSubs[substitutionIngredient] = [substitutionValue]
    }

    setFormData((prev) => ({ ...prev, substitutions: newSubs }))
    setSubstitutionIngredient("")
    setSubstitutionValue("")
  }

  const handleRemoveSubstitution = (ingredient, value) => {
    const updated = { ...formData.substitutions }
    updated[ingredient] = updated[ingredient].filter((v) => v !== value)
    if (updated[ingredient].length === 0) {
      delete updated[ingredient]
    }
    setFormData((prev) => ({ ...prev, substitutions: updated }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const recipeData = {
      ...formData,
      rating: initialData?.rating || 0,
      createdBy: currentUser.username,
    }

    if (isEditing) {
      updateRecipe(initialData.id, recipeData)
      navigate(`/recipe/${initialData.id}`)
    } else {
      const newRecipe = addRecipe(recipeData)
      navigate(`/recipe/${newRecipe.id}`)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditing ? "Edit Recipe" : "Add New Recipe"}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="recipe form tabs">
          <Tab label="Basic Info" />
          <Tab label="Ingredients" />
          <Tab label="Instructions" />
          <Tab label="Additional Info" />
        </Tabs>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        {/* Tab 1: Basic Info */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Recipe Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={2}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Cooking Time (minutes)"
                name="cookingTime"
                type="number"
                value={formData.cookingTime}
                onChange={handleChange}
                error={!!errors.cookingTime}
                helperText={errors.cookingTime}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Servings"
                name="servings"
                type="number"
                value={formData.servings}
                onChange={handleChange}
                error={!!errors.servings}
                helperText={errors.servings}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                label="Difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                error={!!errors.difficulty}
                helperText={errors.difficulty}
              >
                {difficultyLevels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl || "Use a URL to an image for your recipe"}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setActiveTab(1)} variant="contained">
                  Next: Ingredients
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* Tab 2: Ingredients */}
        {activeTab === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            {errors.ingredients && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.ingredients}
              </Typography>
            )}
            
            {formData.ingredients.map((ing, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label={`Ingredient ${i + 1}`}
                  value={ing}
                  onChange={(e) => handleIngredientChange(i, e.target.value)}
                />
                <IconButton onClick={() => removeIngredient(i)} disabled={formData.ingredients.length <= 1}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            
            <Button onClick={addIngredient} startIcon={<AddIcon />} sx={{ mt: 1, mb: 3 }}>
              Add Ingredient
            </Button>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={() => setActiveTab(0)}>Back</Button>
              <Button onClick={() => setActiveTab(2)} variant="contained">
                Next: Instructions
              </Button>
            </Box>
          </>
        )}

        {/* Tab 3: Instructions */}
        {activeTab === 2 && (
          <>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            {errors.instructions && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.instructions}
              </Typography>
            )}
            
            {formData.instructions.map((inst, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label={`Step ${i + 1}`}
                  value={inst}
                  onChange={(e) => handleInstructionChange(i, e.target.value)}
                />
                <IconButton onClick={() => removeInstruction(i)} disabled={formData.instructions.length <= 1}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            
            <Button onClick={addInstruction} startIcon={<AddIcon />} sx={{ mt: 1, mb: 3 }}>
              Add Step
            </Button>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={() => setActiveTab(1)}>Back</Button>
              <Button onClick={() => setActiveTab(3)} variant="contained">
                Next: Additional Info
              </Button>
            </Box>
          </>
        )}

        {/* Tab 4: Additional Info */}
        {activeTab === 3 && (
          <>
            <Typography variant="h6" gutterBottom>
              Dietary Tags
            </Typography>
            <Autocomplete
              multiple
              options={allDietaryTags}
              value={formData.dietaryTags}
              onChange={handleDietaryTagsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Dietary Tags"
                  placeholder="Add dietary tags"
                  helperText="Select all that apply (e.g., vegetarian, gluten-free)"
                />
              )}
              freeSolo
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Substitutions
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Ingredient"
                value={substitutionIngredient}
                onChange={(e) => setSubstitutionIngredient(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                label="Substitution"
                value={substitutionValue}
                onChange={(e) => setSubstitutionValue(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button onClick={handleAddSubstitution} startIcon={<AddIcon />}>
                Add
              </Button>
            </Box>
            
            {Object.entries(formData.substitutions).map(([ingredient, subs]) => (
              <Box key={ingredient} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{ingredient}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {subs.map((sub, i) => (
                    <Chip
                      key={i}
                      label={sub}
                      onDelete={() => handleRemoveSubstitution(ingredient, sub)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button onClick={() => setActiveTab(2)}>Back</Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update Recipe" : "Create Recipe"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  )
}

export default RecipeForm