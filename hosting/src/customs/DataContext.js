import React, { useContext, useReducer } from 'react';

export const DataStateContext = React.createContext({
  cardData: [],
})

export const DataDispatchContext = React.createContext();

function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return state;
    case 'DEL':
      return state;
    default:
      throw new Error('Unhandled action in DataDispatch');
  }
}

export default function DataContext({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    cardData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16]
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
