import React, { useContext, useReducer } from 'react';

// https://react.vlpt.us/using-typescript/04-ts-context.html

export const DataStateContext = React.createContext({
  cardData: [],
  cardsLoaded: false,
  watchingStared: false,
  staredCardData: [],
  staredCardsLoaded: false,
})

export const DataDispatchContext = React.createContext(({type, action}) => {});

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      //console.log(action.cards);
      if (action.isStared) {
        return {
          ...state,
          staredCardData: action.cards,
          staredCardsLoaded: true,
        }
      } else {
        return {
          ...state,
          cardData: action.cards,
          cardsLoaded: true,
        }
      }
    case 'add':
      return {
        ...state,
        cardData: state.cardData.concat(action.card),
      };
    case 'del':
      return state;
    case 'setWatchingStared':
      return {
        ...state,
        watchingStared: action.val,
      }
    default:
      console.error(action);
      throw new Error('Unhandled action in DataDispatch');
  }
}

export default function DataContext({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    cardData: [],
    cardsLoaded: false,
    watchingStared: false,
    staredCardData: [],
    staredCardsLoaded: false,
  });

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
}

export function useDataState() {
  const state = useContext(DataStateContext);
  if (!state) throw new Error('Cannot find DataStateProvider');
  return state;
}

export function useDataDispatch() {
  const dispatch = useContext(DataDispatchContext);
  if (!dispatch) throw new Error('Cannot find DataDispatchProvider');
  return dispatch;
}
