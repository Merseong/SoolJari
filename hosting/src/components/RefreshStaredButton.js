import React, { useState } from 'react';
import {
  Button
} from '@material-ui/core';
import {
  Star,
  StarBorder
} from '@material-ui/icons';
import { useDataDispatch, useDataState } from '../customs/DataContext';
import { useUserContext } from '../customs/UserContext';
import { getStaredCards } from '../firebase';

export default function RefreshStaredButton() {
  const [ viewStar, setViewStar ] = useState(false);

  const dataDispatch = useDataDispatch();
  const dataState = useDataState();
  const userContext = useUserContext();

  const clickToggleStar = () => {
    const nextViewStar = !viewStar;
    setViewStar(nextViewStar);
    dataDispatch({ type:'setWatchingStared', val: nextViewStar});
    if (!dataState.staredCardsLoaded && nextViewStar) {
      getStaredCards(userContext.user.uid)
      .then(cards => {
        dataDispatch({ type: 'set', cards: cards.map(card => card.title), isStared: true});
      });
    }
  }

  return (
    <Button
      color='inherit'
      onClick={clickToggleStar}
    >
      {
        viewStar ? 
        <Star/> :
        <StarBorder/>
      }
    </Button>
  )
}