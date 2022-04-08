/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User } from '../types/index';

const BASE_URL = 'https://vef2-20222-v3-synilausn.herokuapp.com';

export const postLogin = async ({ username, password }:User) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const message = await response.json();
    return ({ message });
  }

  const user = await response.json();
  await localStorage.setItem('user', JSON.stringify(user));
  return ({ user });
};

export const postRegister = async ({ name, username, password }: User) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    body: JSON.stringify({ name, username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const message = await response.json();
    return ({ message });
  }

  const data = await response.json();
  return ({ data });
};
