import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Navbar({ setSelectedChapter }) {

  const handleMenuClick = (chapter) => {
    handleClose();
    setSelectedChapter(chapter);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav-buttons-container">
      <Button
        variant="outlined"
        size="large"
        color="secondary"
        id="basic-button"
        sx={{ borderRadius: 50 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        MENU
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={{ borderRadius: 80 }}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            bgcolor: 'rgba(75, 0, 130)',
            '.MuiMenuItem-root': {
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                transform: 'scale(1.05)',
              }
            },
          },
        }}
      >
        <MenuItem onClick={() => handleMenuClick('Chapter 1')}>Chapter 1</MenuItem>
        <MenuItem onClick={() => handleMenuClick('Chapter 2')}>Chapter 2</MenuItem>
      </Menu>
    </div>
  );
};