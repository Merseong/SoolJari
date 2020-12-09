import React from 'react';
import {
  Grid,
  Card,
  Typography,
  CardContent
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDataState, useDataDispatch } from '../customs/DataContext';
//import firebase from 'firebase/app';
import { useConstructor } from '../customs/hooks';
import { getAllCards } from '../firebase';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: '12px',
  }
}))

export default function DataGrid() {
  useConstructor(() => {
    /*firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getAllCards()
        .then(cards => {
          cardDispatch({ type: 'set', cards: cards.map(card => card.title)});
        })
      } else {
        cardDispatch({ type: 'set', cards: [] });
      }
    })*/
    // for dev
    getAllCards()
    .then(cards => {
      dataDispatch({ type: 'set', cards: cards.map(card => card.title)});
    });
  });

  const dataState = useDataState();
  const cardData = dataState.watchingStared ? dataState.staredCardData : dataState.cardData;
  const dataDispatch = useDataDispatch();
  const classes = useStyles();

  return (
    <div className={classes.container}>
    <Grid container justify="flex-start" spacing={2}>
      {
        cardData.map(tile => (
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {tile}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
    </div>
  )
}