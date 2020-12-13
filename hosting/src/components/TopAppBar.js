import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  AssignmentInd,
  LocalBar,
  CropSquare,
  Search,
} from '@material-ui/icons';
import { googleLoginAction, logoutAction } from '../firebase';
import { useUserContext } from '../customs/UserContext';
import RefreshStaredButton from './RefreshStaredButton';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const userContext = useUserContext();
  const isAdmin = userContext.user?.email === 'esc990720@korea.ac.kr';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant='dense'>
          <LocalBar edge='start'/>
          <Typography variant="h6" className={classes.title} noWrap>
            SoolJari
          </Typography>
          <div className={classes.search}>
            <SearchBar/>
          </div>
          <div className={classes.grow}/>
          {
            userContext.user ? 
            <RefreshStaredButton/> :
            <></>
          }
          <IconButton
            color='inherit'
            onClick={() => {
            if (userContext.user) {
                logoutAction();
            } else {
                googleLoginAction();
            }
            }}
          >
          {userContext.user ? (
            isAdmin ? 
            <AssignmentInd/> :
            <AssignmentInd color='secondary'/>
          ) : <CropSquare/>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
