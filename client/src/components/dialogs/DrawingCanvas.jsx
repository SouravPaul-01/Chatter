import React, { useRef, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Box,
  Button,
  Grid,
  Popover,
} from '@mui/material';
import {
  Close as CloseIcon,
  ColorLens as ColorLensIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { getSocket } from '../../socket';
import { NEW_DRAWING } from '../../constants/event';
import toast from 'react-hot-toast';

const DrawingCanvas = ({ open, onClose, chatId, members }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [anchorEl, setAnchorEl] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const socket = getSocket();

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#008000', '#800000', '#008080', '#000080', '#808080'
  ];

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Set initial canvas style
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state
    saveState();
    setIsCanvasReady(true);
  };

  useEffect(() => {
    if (!open) {
      setIsCanvasReady(false);
      return;
    }

    // Initialize canvas after a short delay to ensure DOM is ready
    const timer = setTimeout(initializeCanvas, 100);

    return () => {
      clearTimeout(timer);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
  }, [open]);

  const saveState = () => {
    if (!canvasRef.current || !isCanvasReady) return;
    
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');
    setUndoStack(prev => [...prev, imageData]);
    setRedoStack([]);
  };

  const undo = () => {
    if (!isCanvasReady || undoStack.length <= 1) return;
    
    const currentState = undoStack[undoStack.length - 1];
    setRedoStack(prev => [...prev, currentState]);
    
    const newUndoStack = undoStack.slice(0, -1);
    setUndoStack(newUndoStack);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = newUndoStack[newUndoStack.length - 1];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const redo = () => {
    if (!isCanvasReady || redoStack.length === 0) return;
    
    const stateToRestore = redoStack[redoStack.length - 1];
    setUndoStack(prev => [...prev, stateToRestore]);
    setRedoStack(prev => prev.slice(0, -1));
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = stateToRestore;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    if (!isCanvasReady) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const startDrawing = (e) => {
    if (!isCanvasReady) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !isCanvasReady) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const handleColorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
    handleColorClose();
  };

  const handleSend = () => {
    if (!isCanvasReady) return;
    
    const canvas = canvasRef.current;
    const drawingData = canvas.toDataURL('image/png');
    
    socket.emit(NEW_DRAWING, {
      chatId,
      members,
      drawing: drawingData
    });
    
    toast.success('Drawing sent!');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          Drawing Canvas
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton onClick={handleColorClick}>
              <ColorLensIcon />
            </IconButton>
            <IconButton onClick={undo} disabled={!isCanvasReady || undoStack.length <= 1}>
              <UndoIcon />
            </IconButton>
            <IconButton onClick={redo} disabled={!isCanvasReady || redoStack.length === 0}>
              <RedoIcon />
            </IconButton>
            <IconButton onClick={clearCanvas} disabled={!isCanvasReady}>
              <DeleteIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: 1,
              overflow: 'hidden',
              height: '600px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{
                cursor: 'crosshair',
                touchAction: 'none',
                backgroundColor: '#FFFFFF',
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            fullWidth
            disabled={!isCanvasReady}
          >
            Send Drawing
          </Button>
        </Stack>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleColorClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Grid container spacing={1} p={1} sx={{ width: 200 }}>
            {colors.map((color) => (
              <Grid item key={color}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={() => handleColorSelect(color)}
                />
              </Grid>
            ))}
          </Grid>
        </Popover>
      </DialogContent>
    </Dialog>
  );
};

export default DrawingCanvas;
