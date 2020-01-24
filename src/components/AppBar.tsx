import { AppBar, IconButton, Menu, MenuItem, Theme, Toolbar, Typography, ListItemIcon } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Settings, Lock } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { logout } from '../features/teachers/teacherSlice';
import history from '../history';
import Loading from './Loading';

export default () => {
  const teacher = useSelector((state: RootState) => state.teachers.teacher);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (teacher == null) {
    return <Loading />;
  }

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/');
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="regular">
        <IconButton className={classes.icon}>
          <img src="/apple-touch-icon.png" alt="" width="40" />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          Mr K.'s Sokrates
        </Typography>

        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit">
          <AccountCircle />
        </IconButton>
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
          onClose={handleClose}>
          <MenuItem onClick={() => history.push('/edit')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            Einstellungen
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            Abmelden
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      '@media print': {
        display: 'none',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    icon: {
      margin: 0,
      marginRight: theme.spacing(2),
      padding: 0,
    },
  })
);
