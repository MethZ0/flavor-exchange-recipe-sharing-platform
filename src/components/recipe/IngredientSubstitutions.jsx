"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import InfoIcon from "@mui/icons-material/Info"

const IngredientSubstitutions = ({ ingredients, substitutions }) => {
  const [activeSubstitutions, setActiveSubstitutions] = useState({})
  const [expanded, setExpanded] = useState(true) // Start expanded by default

  if (!substitutions || Object.keys(substitutions).length === 0) {
    return null
  }

  const toggleSubstitution = (ingredient) => {
    setActiveSubstitutions((prev) => {
      const newState = { ...prev }

      // If ingredient is already substituted, revert to original
      if (newState[ingredient]) {
        delete newState[ingredient]
      } else {
        // Otherwise, use the first substitution
        newState[ingredient] = substitutions[ingredient][0]
      }

      return newState
    })
  }

  const getModifiedIngredientsList = () => {
    return ingredients.map((ingredient) => {
      // Check if this ingredient has a substitution and is active
      for (const [original, subs] of Object.entries(substitutions)) {
        if (ingredient.includes(original) && activeSubstitutions[original]) {
          return ingredient.replace(original, activeSubstitutions[original])
        }
      }
      return ingredient
    })
  }

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="substitutions-content"
          id="substitutions-header"
        >
          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
            <SwapHorizIcon sx={{ mr: 1 }} />
            Ingredient Substitutions Available
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" paragraph>
            Don't have all the ingredients? Try these substitutions! Click on an ingredient to swap it.
          </Typography>

          <List dense>
            {Object.entries(substitutions).map(([ingredient, subs]) => (
              <ListItem
                key={ingredient}
                secondaryAction={
                  <Tooltip title="Click to swap ingredient">
                    <IconButton
                      edge="end"
                      aria-label="swap"
                      onClick={() => toggleSubstitution(ingredient)}
                      color={activeSubstitutions[ingredient] ? "primary" : "default"}
                    >
                      <SwapHorizIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography component="span" fontWeight={activeSubstitutions[ingredient] ? "normal" : "bold"}>
                        {ingredient}
                      </Typography>
                      {activeSubstitutions[ingredient] && (
                        <>
                          <Typography component="span" sx={{ mx: 1 }}>
                            →
                          </Typography>
                          <Typography component="span" fontWeight="bold" color="primary.main">
                            {activeSubstitutions[ingredient]}
                          </Typography>
                        </>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                      {subs.map((sub, idx) => (
                        <Chip
                          key={idx}
                          label={sub}
                          size="small"
                          variant={activeSubstitutions[ingredient] === sub ? "filled" : "outlined"}
                          color={activeSubstitutions[ingredient] === sub ? "primary" : "default"}
                          onClick={() => {
                            setActiveSubstitutions((prev) => ({
                              ...prev,
                              [ingredient]: sub,
                            }))
                          }}
                        />
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>

          {Object.keys(activeSubstitutions).length > 0 && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                Modified Ingredients List
              </Typography>
              <List dense>
                {getModifiedIngredientsList().map((ingredient, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={ingredient}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: Object.entries(activeSubstitutions).some(([orig]) =>
                          ingredient.includes(activeSubstitutions[orig]),
                        )
                          ? "primary"
                          : "textPrimary",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default IngredientSubstitutions

