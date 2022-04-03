/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, useContext, useState } from 'react';

const beginState = true;
export const AppContext = createContext({
  isLoggedin: beginState,
  register: () => {},
  logout: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppWrapper({ children }: any) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const register = ():void => {
    setIsLoggedin(true);
  };
  const logout = ():void => {
    setIsLoggedin(false);
  };
  return (
    <AppContext.Provider value={{
      isLoggedin,
      register,
      logout,
    }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useAppContext() {
  return useContext(AppContext);
}
