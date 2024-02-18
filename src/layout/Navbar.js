import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
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
        onClick={handleClick}
      >
        Story
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="menuContent">
          <Button className="menuItem" onClick={() => navigate('/AI-Arena')}>AI-Arena</Button>
          <Button className="menuItem" onClick={() => navigate('/Misc')}>Misc</Button>
        </div>
      </Menu>
    </div>
  );
};