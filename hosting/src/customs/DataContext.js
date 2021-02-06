import React, { useContext, useReducer } from 'react';

// https://react.vlpt.us/using-typescript/04-ts-context.html

export const DataStateContext = React.createContext({
  selectedCard: null,
})

export const DataDispatchContext = React.createContext(({type, action}) => {});

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return {
				...state,
				selectedCard: action.card,
			}
		case 'erase':
			return {
				...state,
				selectedCard: null,
			}
    default:
      console.error(action);
      throw new Error('Unhandled action in DataDispatch');
  }
}

export default function DataContext({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    selectedCard: null,
		
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
