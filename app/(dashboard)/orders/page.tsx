import * as React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function OrdersPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 4,
        textAlign: 'center',
      }}
    >
      {/* <HourglassEmptyIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} /> */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.secondary' }}>
        Welcome to the BCFCODE Orders Page!
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
        This feature is coming soon and is currently under development.
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          Stay tuned for updates!
        </Typography>
        {/* <LinearProgress color="secondary" /> */}
      </Box>
    </Box>
  );
}
