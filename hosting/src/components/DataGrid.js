import React from 'react';
import {
  Grid,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDataState } from '../customs/DataContext';
//import firebase from 'firebase/app';
import { useConstructor } from '../customs/hooks';
//import { getAllCards } from '../firebase';
import MyCard from './MyCard';

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
    //dataDispatch({ type: 'set', cards: [] });
  });

  const dataState = useDataState();
  const cardData = dataState.watchingStared ? dataState.staredCardData : dataState.cardData;
  //const dataDispatch = useDataDispatch();
  const classes = useStyles();

  return (
    <div className={classes.container}>
    <Grid container justify="flex-start" spacing={2}>
      {
        cardData.map(tile => (
          <Grid item xs={6} sm={3} md={2} lg={2} key={tile.title}>
            <MyCard
              cardData={tile}
            />
          </Grid>
        ))
      }
    </Grid>
    </div>
  )
}