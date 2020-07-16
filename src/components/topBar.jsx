import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './topBar.css';

export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar className="TopBar" position="static">
        <Toolbar>
            <div className="ProjectTitle">
              <TextField required id="standard-required" label="Obligatorio" defaultValue="Nuevo Proyecto" />
            </div>
        </Toolbar>
        <Grid justify="right" container spacing={24}>
          <Grid item>
            <div className="Tools">
              <Button onClick={handleMenu}>
                Archivo
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Option1</MenuItem>
                <MenuItem onClick={handleClose}>Option2</MenuItem>
              </Menu>
            </div>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}