"use client"

import { useState } from "react"
import { useRecipes } from "../../context/RecipeContext"
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import ClearIcon from "@mui/icons-material/Clear"

const DietaryFilters = () => {
  const { availableDietaryTags, dietaryFilters, setDietaryFilters } = useRecipes()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleToggleFilter = (tag) => {
    setDietaryFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleClearFilters = () => {
    setDietaryFilters([])
  }

  if (!availableDietaryTags || availableDietaryTags.length === 0) return null

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Dietary Filters">
          <Button
            variant="outlined"
            onClick={handleOpen}
            startIcon={
              <Badge badgeContent={dietaryFilters.length} color="primary">
                <FilterListIcon />
              </Badge>
            }
          >
            Dietary Filters
          </Button>
        </Tooltip>

        {dietaryFilters.length > 0 && (
          <Tooltip title="Clear all filters">
            <IconButton onClick={handleClearFilters}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: { p: 2, borderRadius: 2, minWidth: 220 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Select Dietary Tags
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {availableDietaryTags.map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Checkbox
                  checked={dietaryFilters.includes(tag)}
                  onChange={() => handleToggleFilter(tag)}
                />
              }
              label={tag}
            />
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default DietaryFilters
