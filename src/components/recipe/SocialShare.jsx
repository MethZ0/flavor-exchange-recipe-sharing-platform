import { useState } from 'react'
import {
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ShareIcon from '@mui/icons-material/Share'

const SocialShare = ({ recipe }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  
  const handleShare = (platform) => {
    // In a real app, these would link to actual sharing endpoints
    setSnackbarMessage(`Shared to ${platform}! (This is a mock implementation)`)
    setSnackbarOpen(true)
  }
  
  const handleCopyLink = () => {
    // Mock implementation - in a real app, this would copy the actual URL
    navigator.clipboard.writeText(`https://recipe-hub.example/recipe/${recipe.id}`)
      .then(() => {
        setSnackbarMessage('Link copied to clipboard!')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
        setSnackbarMessage('Failed to copy link')
        setSnackbarOpen(true)
      })
  }
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }
  
  const handleOpenEmailDialog = () => {
    setEmailDialogOpen(true)
  }
  
  const handleCloseEmailDialog = () => {
    setEmailDialogOpen(false)
  }
  
  const handleSendEmail = () => {
    handleShare('Email')
    setEmailDialogOpen(false)
  }
  
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <ShareIcon fontSize="small" sx={{ mr: 1 }} />
        Share this recipe
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Share on Facebook">
          <IconButton 
            onClick={() => handleShare('Facebook')} 
            aria-label="share on facebook"
            sx={{ color: '#1877F2' }}
          >
            <FacebookIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Share on Twitter">
          <IconButton 
            onClick={() => handleShare('Twitter')} 
            aria-label="share on twitter"
            sx={{ color: '#1DA1F2' }}
          >
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Share on Pinterest">
          <IconButton 
            onClick={() => handleShare('Pinterest')} 
            aria-label="share on pinterest"
            sx={{ color: '#E60023' }}
          >
            <PinterestIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Share on WhatsApp">
          <IconButton 
            onClick={() => handleShare('WhatsApp')} 
            aria-label="share on whatsapp"
            sx={{ color: '#25D366' }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Share via Email">
          <IconButton 
            onClick={handleOpenEmailDialog} 
            aria-label="share via email"
            sx={{ color: '#EA4335' }}
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Copy Link">
          <IconButton 
            onClick={handleCopyLink} 
            aria-label="copy link"
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      <Dialog open={emailDialogOpen} onClose={handleCloseEmailDialog}>
        <DialogTitle>Share via Email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="recipient"
            label="Recipient Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={`Check out this recipe: ${recipe.title}`}
          />
          <TextField
            margin="dense"
            id="message"
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            defaultValue={`I found this amazing recipe for ${recipe.title} and thought you might like it!\n\nDescription: ${recipe.description}\n\nCheck it out at: https://recipe-hub.example/recipe/${recipe.id}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailDialog}>Cancel</Button>
          <Button onClick={handleSendEmail} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SocialShare
