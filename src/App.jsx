"use client"

import { Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"
import RecipeDetails from "./pages/RecipeDetails"
import Login from "./pages/Login"
import Signup from "./pages/Signip"
import AddRecipe from "./pages/AddRecipe"
import EditRecipe from "./pages/EditRecipe"
import Favorites from "./pages/Favorites"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { useAuth } from "./context/AuthContext"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useState, useMemo } from "react"

function App() {
  const [mode, setMode] = useState("light")
  const { isAuthenticated } = useAuth()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#10b981",
          },
          secondary: {
            main: "#f59e0b",
          },
        },
      }),
    [mode],
  )

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen">
        <Navbar toggleColorMode={toggleColorMode} mode={mode} />
        <main className="flex-grow container py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/add-recipe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AddRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-recipe/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

