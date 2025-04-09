"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  useTheme,
  alpha,
  Skeleton,
  Paper,
  Divider,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import LocalDiningIcon from "@mui/icons-material/LocalDining"
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import { useState, useEffect } from "react"

const RecipeCard = ({ recipe }) => {
  const theme = useTheme()
  const { currentUser, addToFavorites, removeFromFavorites, isAuthenticated } = useAuth()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showFavorite, setShowFavorite] = useState(false)
  const [elevation, setElevation] = useState(2)

  // Debug logging
  useEffect(() => {
    console.log("Recipe in RecipeCard:", recipe)
  }, [recipe])

  const isFavorite = currentUser?.favorites?.includes(recipe.id)

  const handleFavoriteToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe.id)
    }
  }

  const getTagColor = (tag) => {
    const tagMap = {
      vegan: "success",
      vegetarian: "success",
      "gluten-free": "info",
      "dairy-free": "info",
      keto: "warning",
      paleo: "warning",
      "low-carb": "warning",
      "nut-free": "info",
      "high-protein": "secondary",
    }
    return tagMap[tag.toLowerCase()] || "primary"
  }

  if (!recipe) {
    return <div>Loading recipe...</div>
  }

  return (
    <Card
      sx={{
        width: 345,
        height: 480, // FIXED CARD HEIGHT
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: theme.shadows[elevation],
        position: "relative",
        transition: "box-shadow 200ms ease",
        "&:hover": {
          boxShadow: theme.shadows[8],
        },
      }}
      onMouseEnter={() => {
        setElevation(4)
        setShowFavorite(true)
      }}
      onMouseLeave={() => {
        setElevation(2)
        setShowFavorite(false)
      }}
    >
      <Box sx={{ position: "relative", height: "12rem" }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
        <CardMedia
          component="img"
          image={recipe.imageUrl || "/placeholder.svg?height=200&width=300"}
          alt={recipe.title || "Recipe"}
          onLoad={() => setImageLoaded(true)}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {isAuthenticated && (showFavorite || isFavorite) && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              opacity: showFavorite || isFavorite ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <IconButton
              onClick={handleFavoriteToggle}
              color={isFavorite ? "error" : "default"}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              sx={{
                p: 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                "&:hover": {
                  backgroundColor: theme.palette.background.paper,
                },
                transition: "background-color 0.2s",
              }}
            >
              {isFavorite ? (
                <FavoriteIcon
                  sx={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: theme.palette.error.main,
                  }}
                />
              ) : (
                <FavoriteBorderIcon sx={{ width: "1.25rem", height: "1.25rem" }} />
              )}
            </IconButton>
          </Box>
        )}

        <Paper
          elevation={1}
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            display: "flex",
            alignItems: "center",
            padding: "4px 8px",
            borderRadius: 1,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(4px)",
          }}
        >
          <Rating value={recipe.rating || 0} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
            {(recipe.rating || 0).toFixed(1)}
          </Typography>
        </Paper>
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: "1.125rem",
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: "1.4rem",
            height: "2.8rem", // Ensures fixed height for 2 lines
          }}
        >
          {recipe.title || "Untitled Recipe"}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          By {recipe.createdBy || "Unknown Chef"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
          <Typography variant="body2" color="text.secondary">
            {recipe.cookingTime || 0} mins
          </Typography>
        </Box>

        {recipe.dietaryTags && Array.isArray(recipe.dietaryTags) && recipe.dietaryTags.length > 0 && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 1.5 }}>
              {recipe.dietaryTags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  color={getTagColor(tag)}
                  variant="outlined"
                  sx={{
                    mb: 0.5,
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    borderRadius: 1,
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              ))}
              {recipe.dietaryTags.length > 3 && (
                <Chip
                  label={`+${recipe.dietaryTags.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 0.5, fontSize: "0.7rem" }}
                />
              )}
            </Stack>
          </>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="medium"
          component={Link}
          to={`/recipe/${recipe.id}`}
          color="primary"
          variant="contained"
          disableElevation
          endIcon={<LocalDiningIcon />}
          sx={{
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 500,
            flex: 1,
            py: 0.75,
          }}
        >
          View Recipe
        </Button>

        <Tooltip title="Save for later">
          <IconButton
            size="small"
            color="primary"
            sx={{
              ml: 1,
              width: 38,
              height: 38,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
              },
            }}
          >
            <BookmarkAddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default RecipeCard