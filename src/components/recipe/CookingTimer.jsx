import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  IconButton,
  useTheme
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimerIcon from '@mui/icons-material/Timer';
import CloseIcon from '@mui/icons-material/Close';

const CookingTimer = ({ defaultMinutes = 5 }) => {
  const [open, setOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [customTime, setCustomTime] = useState(defaultMinutes);
  const [showCompleteMessage, setShowCompleteMessage] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setShowCompleteMessage(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(customTime * 60);
  };

  const handleSetTime = () => {
    setTimeLeft(customTime * 60);
    setIsRunning(false);
    setOpen(false);
  };

  return (
    <Box className="mt-4 mb-6">
      <Box 
        className="rounded-lg shadow-md p-6 max-w-md mx-auto"
        sx={{ 
          backgroundColor: 'background.paper',
        }}
      >
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="flex items-center gap-2">
            <TimerIcon color="primary" />
            Cooking Timer
          </Typography>
          <Button 
            variant="text" 
            size="small" 
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 4, px: 2 }}
          >
            Set Time
          </Button>
        </Box>

        <Box className="flex flex-col items-center justify-center py-4">
          <Box className="text-center mb-4">
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 'bold',
                color: isRunning ? 'primary.main' : 'text.primary'
              }}
            >
              {formatTime(timeLeft)}
            </Typography>
            
            {showCompleteMessage && (
              <Box 
                className="p-2 rounded-md mt-2 animate-pulse"
                sx={{
                  backgroundColor: isDarkMode ? 'rgba(220, 38, 38, 0.2)' : 'rgba(254, 226, 226, 0.8)',
                  color: isDarkMode ? 'error.light' : 'error.dark'
                }}
              >
                Timer Complete!
              </Box>
            )}
          </Box>

          <Box className="flex gap-4 justify-center mt-2">
            {!isRunning ? (
              <IconButton 
                color="primary" 
                onClick={handleStart}
                sx={{ 
                  backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 246, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(219, 234, 254, 0.8)'
                  }
                }}
                size="large"
              >
                <PlayArrowIcon fontSize="large" />
              </IconButton>
            ) : (
              <IconButton 
                color="warning" 
                onClick={handlePause}
                sx={{ 
                  backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 251, 235, 0.8)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(254, 243, 199, 0.8)'
                  }
                }}
                size="large"
              >
                <PauseIcon fontSize="large" />
              </IconButton>
            )}
            
            <IconButton 
              color="secondary" 
              onClick={handleReset}
              sx={{ 
                backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(243, 232, 255, 0.8)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(233, 213, 255, 0.8)'
                }
              }}
              size="large"
            >
              <RestartAltIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Timer Setup Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box className="flex justify-between items-center">
            <span>Set Timer</span>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box className="my-4 px-2">
            <Typography gutterBottom>
              Minutes: {customTime}
            </Typography>
            <Slider
              value={customTime}
              onChange={(e, newValue) => setCustomTime(newValue)}
              step={1}
              marks={[
                { value: 1, label: '1m' },
                { value: 30, label: '30m' },
                { value: 60, label: '60m' },
              ]}
              min={1}
              max={60}
              className="mt-6"
            />
          </Box>
        </DialogContent>
        
        <DialogActions className="p-4">
          <Button onClick={() => setOpen(false)} variant="text">
            Cancel
          </Button>
          <Button onClick={handleSetTime} variant="contained">
            Set Timer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CookingTimer;