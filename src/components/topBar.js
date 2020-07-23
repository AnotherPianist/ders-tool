import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import './topBar.css';

export default function TopBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar className={props.appBarClass} position="absolute">
        <Toolbar className={props.toolBarClass}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            className={props.iconClass}
          >
            <MenuIcon />
          </IconButton>
          <TextField placeholder="Nombre Proyecto" />
          </Toolbar>
          <Grid>
            <Grid item>
              <div className="Tools">
                <Button onClick={handleMenu}>Archivo</Button>
                <Menu id="menu-appbar"
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
    </React.Fragment>
  );
}
