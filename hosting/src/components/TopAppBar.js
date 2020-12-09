import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import {
  AssignmentInd,
  LocalBar,
} from '@material-ui/icons';
import { googleLoginAction, logoutAction } from '../firebase';
import { useUserContext } from '../customs/UserContext';
import RefreshStaredButton from './RefreshStaredButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
          <LocalBar/>
          <Typography edge="start" variant="h6" className={classes.title}>
            SoolJari
          </Typography>
          {
            userContext.user ? 
            <RefreshStaredButton/> :
            <></>
          }
          <Button
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
          ) : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
