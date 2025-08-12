import { CheckOutlined } from '@ant-design/icons';
import { Box, Button, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Tesseract from 'tesseract.js';

import MainCard from './MainCard';

const canvasStyles = {
  border: '2px dashed #90caf9',
  borderRadius: '12px',
  width: '100%',
  height: '400px',
  backgroundColor: '#fff'
};

const SketchOCRCanvas = () => {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const extractText = async () => {
    if (!canvasRef.current) return;

    try {
      setLoading(true);
      const imageData = await canvasRef.current.exportImage('png');
      const result = await Tesseract.recognize(imageData, 'eng');
      const newText = result.data.text.trim();
      setRecognizedText(newText);
    } catch (error) {
      console.error('OCR Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startExtractionInterval = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      extractText();
    }, 3000);
  };

  const stopExtractionInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStroke = () => {
    startExtractionInterval();

    if (handleStroke.debounceTimer) clearTimeout(handleStroke.debounceTimer);
    handleStroke.debounceTimer = setTimeout(() => {
      stopExtractionInterval();
    }, 3000);
  };

  const handleClearCanvas = async () => {
    stopExtractionInterval();
    if (canvasRef.current) {
      await canvasRef.current.clearCanvas();
    }
    setRecognizedText('');
  };

  useEffect(() => {
    return () => {
      stopExtractionInterval();
    };
  }, []);

  return (
    <Stack spacing={4}>
      <MainCard content={false} sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Draw in the canvas below. We’ll extract the text every 3 seconds while you write.
        </Typography>

        <ReactSketchCanvas
          ref={canvasRef}
          style={canvasStyles}
          strokeWidth={4}
          strokeColor={theme.palette.mode === 'dark' ? '#fff' : '#000'}
          onStroke={handleStroke}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
          <Button variant="outlined" color="error" onClick={handleClearCanvas}>
            Clear
          </Button>
        </Stack>
      </MainCard>

      <MainCard content={false} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Typography variant="h6">📝 Recognized Text</Typography>
          {loading ? <CircularProgress size={18} /> : recognizedText && <CheckOutlined style={{ color: 'green', fontSize: 18 }} />}
        </Stack>

        <Box
          sx={{
            whiteSpace: 'pre-line',
            fontSize: '1rem',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            p: 2,
            borderRadius: 1,
            minHeight: 100
          }}
        >
          {recognizedText || 'Start writing...'}
        </Box>
      </MainCard>
    </Stack>
  );
};

export default SketchOCRCanvas;
