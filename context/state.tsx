/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { User, UserContextType } from '../types/index';

const defaultUser: User | null = null;
const defaultLoggedin: true | false = false;
export const AppContext = createContext<UserContextType>({
  loggedin: defaultLoggedin,
  user: defaultUser,
  newUser: (user: User | null) => {},
  logoutUser: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppWrapper({ children }: any) : JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loggedin, setLoggedin] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser(): Promise<void> {
      const localUser = JSON.parse(localStorage.getItem('user') || 'null');
      let token = 'null';
      if (localUser !== 'null') {
        token = localUser.token;
      }
      console.info(`Token fundin á localstorage: ${token} `);
      if (token !== 'null') {
        const res = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/users/me', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          await localStorage.setItem('user', 'null');
          setUser(null);
          setLoggedin(false);
        }
        const result:User = await res.json();
        setUser(result);
        setLoggedin(true);
      }
    }

    fetchUser();
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLoggedin(false);
  };

  const newUser = (sethisUser: User | null) => {
    console.info(sethisUser);
    setUser(sethisUser);
    setLoggedin(true);
  };

  return (
    <AppContext.Provider value={{
      loggedin,
      user,
      newUser,
      logoutUser,
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
