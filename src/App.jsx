import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Table from './components/Table';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f7f7f7', minHeight: '100vh' }}>
        <Box sx={{ mb: 3 }}>
          <h1>รายการขอขึ้นทะเบียน</h1>
        </Box>
        <Table />
      </Box>
    </Box>
  );
};

export default App;
