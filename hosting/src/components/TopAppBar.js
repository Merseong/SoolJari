import React, { useContext } from 'react';
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
import SuperContext from '../customs/SuperContext';

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
  const superContext = useContext(SuperContext);
  const isAdmin = superContext.userData?.email === 'esc990720@korea.ac.kr';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant='dense'>
          <LocalBar/>
          <Typography edge="start" variant="h6" className={classes.title}>
            SoolJari
          </Typography>
          <Button
            color='inherit'
            onClick={() => {
            if (superContext.userData) {
                logoutAction();
            } else {
                googleLoginAction();
            }
            }}
          >
          {superContext.userData ? (
            (
              isAdmin ? 
              <AssignmentInd/> :
              <AssignmentInd color='secondary'/>
            )
          ) : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
