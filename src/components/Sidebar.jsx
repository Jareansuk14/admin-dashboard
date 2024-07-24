import React, { useState } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleIcon from '@mui/icons-material/People';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const menuItems = [
  { text: 'หน้าหลัก', icon: <HomeIcon />, index: 0 },
  { text: 'ขึ้นทะเบียนสำเร็จ', icon: <AssignmentTurnedInIcon />, index: 1 },
  { text: 'User Management', icon: <PeopleIcon />, index: 2 },
  { text: 'บริการอื่นๆ', icon: <MiscellaneousServicesIcon />, index: 3 },
  { text: 'คำถามที่พบบ่อย', icon: <HelpOutlineIcon />, index: 4 },
  { text: 'ออกจากระบบ', icon: <ExitToAppIcon />, index: 5 },
];

const MenuItem = ({ text, icon, index, selectedIndex, onClick }) => (
  <ListItem button selected={selectedIndex === index} onClick={() => onClick(index)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }} />
  </ListItem>
);

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{height: 1100, width: 250, bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
      <Box>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ width: 100, height: 100, bgcolor: '#ccc', margin: '0 auto' }} />
          <Typography variant="h6" mt={2} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>นพ.ทดลอง ระบบแพทย์</Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>กระทรวงสาธารณสุข กรมควบคุมโรค</Typography>
        </Box>
        <List>
          {menuItems.slice(0, 3).map((item) => (
            <MenuItem
              key={item.index}
              text={item.text}
              icon={item.icon}
              index={item.index}
              selectedIndex={selectedIndex}
              onClick={handleListItemClick}
            />
          ))}
        </List>
      </Box>
      <Box>
        <List>
          {menuItems.slice(3).map((item) => (
            <MenuItem
              key={item.index}
              text={item.text}
              icon={item.icon}
              index={item.index}
              selectedIndex={selectedIndex}
              onClick={handleListItemClick}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
