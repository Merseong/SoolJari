import React, { useContext } from 'react';

const UserContext = React.createContext({
  user: undefined,
  userData: undefined,
});

export function useUserContext() {
  const state = useContext(UserContext);
  if (!state) throw new Error('Cannot find UserContext');
  return state;
}

export default UserContext;
