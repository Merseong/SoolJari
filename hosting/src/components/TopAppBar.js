import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
            <div className={classes.searchIcon}>
              <Search/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
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
