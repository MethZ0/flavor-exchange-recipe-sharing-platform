"use client"

import { useState } from "react"
import { useRecipes } from "../../context/RecipeContext"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Badge,
} from "@mui/material"
import { FilterList as FilterIcon } from "@mui/icons-material"

// Predefined filter tags
const predefinedTags = [
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

export default function FilterDialog() {
  const { availableDietaryTags, dietaryFilters, setDietaryFilters } = useRecipes()
  const [open, setOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState(dietaryFilters)

  // Combine and deduplicate tags
  const combinedTags = Array.from(new Set([...predefinedTags, ...availableDietaryTags]))

  const handleCheckboxChange = (tag) => {
    setTempFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const applyFilters = () => {
    setDietaryFilters(tempFilters)
    setOpen(false)
  }

  const resetFilters = () => {
    setTempFilters([])
    setDietaryFilters([])
    setOpen(false)
  }

  return (
    <>
      <Badge
        badgeContent={dietaryFilters.length}
        color="primary"
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={() => {
            setTempFilters(dietaryFilters) // reset local state when reopening
            setOpen(true)
          }}
          size="medium"
        >
          Filter
        </Button>
      </Badge>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Filter Recipes</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" gutterBottom>
            Dietary Restrictions
          </Typography>
          <FormGroup>
            {combinedTags.map((tag) => (
              <FormControlLabel
                key={tag}
                control={
                  <Checkbox
                    checked={tempFilters.includes(tag)}
                    onChange={() => handleCheckboxChange(tag)}
                    name={tag}
                  />
                }
                label={tag}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters} color="inherit">
            Reset
          </Button>
          <Button onClick={applyFilters} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
