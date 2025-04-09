"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom"
import { Paper, InputBase, IconButton, Box } from "@mui/material"
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material"
import FilterDialog from "./FilterDialog"
import { useRecipes } from "../../context/RecipeContext" // Update this path

export default function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const { setSearchTerm } = useRecipes() // Get the setSearchTerm function from context
  
  // Update the search term in the context when URL search param changes
  useEffect(() => {
    const queryParam = searchParams.get("q") || ""
    setSearchTerm(queryParam)
    setSearchQuery(queryParam)
  }, [searchParams, setSearchTerm])
  
  const handleSearch = (e) => {
    e.preventDefault()
    
    // Update the search term in the context
    setSearchTerm(searchQuery.trim())
    
    // Update URL for bookmarkable searches
    if (searchQuery.trim()) {
      navigate({
        pathname: "/",
        search: `?${createSearchParams({ q: searchQuery.trim() })}`,
      })
    } else {
      navigate("/")
    }
  }
  
  const clearSearch = () => {
    setSearchQuery("")
    setSearchTerm("") // Clear the search term in the context
    navigate("/")
  }
  
  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSearch}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              borderRadius: 2,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              backgroundColor: "background.paper",
              "&:hover": {
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              },
              transition: "box-shadow 0.2s ease-in-out",
            }}
            elevation={0}
          >
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ 
                ml: 1, 
                flex: 1,
                "& .MuiInputBase-input": {
                  fontSize: "1rem",
                }
              }}
              placeholder="Search recipes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ "aria-label": "search recipes" }}
            />
            {searchQuery && (
              <IconButton sx={{ p: "10px" }} aria-label="clear search" onClick={clearSearch}>
                <ClearIcon />
              </IconButton>
            )}
          </Paper>
          <FilterDialog />
        </Box>
      </form>
    </Box>
  )
}