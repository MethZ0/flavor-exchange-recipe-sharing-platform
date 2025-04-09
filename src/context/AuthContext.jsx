"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    // In a real app, this would make an API call
    setCurrentUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const signup = (userData) => {
    // In a real app, this would make an API call
    // For now, we'll just store in localStorage
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      favorites: [],
    }

    // Check if users exist in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if username already exists
    const userExists = users.some((user) => user.username === userData.username)
    if (userExists) {
      throw new Error("Username already exists")
    }

    // Add new user to users array
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Log in the new user
    setCurrentUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(newUser))

    return newUser
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const addToFavorites = (recipeId) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      favorites: [...currentUser.favorites, recipeId],
    }

    setCurrentUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((user) => (user.id === currentUser.id ? updatedUser : user))
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const removeFromFavorites = (recipeId) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      favorites: currentUser.favorites.filter((id) => id !== recipeId),
    }

    setCurrentUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((user) => (user.id === currentUser.id ? updatedUser : user))
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    addToFavorites,
    removeFromFavorites,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

