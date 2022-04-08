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
    await localStorage.setItem('user', 'null');
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
    await localStorage.setItem('user', 'null');
    const message = await response.json();
    return ({ message });
  }

  const data = await response.json();
  return ({ data });
};

export const postRegiserEvent = async (id:string, comment:string) => {
  const localUser = JSON.parse(localStorage.getItem('user') || 'null');
  let token = 'null';
  if (localUser !== 'null') {
    token = localUser.token;
  }
  console.info(`Token fundin á localstorage: ${token} `);
  const response = await fetch(`${BASE_URL}/events/${id}/register`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    const message = await response.json();
    return ({ message });
  }

  const data = await response.json();
  return ({ data });
};

export const deleteRegisterEvent = async (id:string) => {
  const localUser = JSON.parse(localStorage.getItem('user') || 'null');
  let token = 'null';
  if (localUser !== 'null') {
    token = localUser.token;
  }
  console.info(`Token fundin á localstorage: ${token} `);
  const response = await fetch(`${BASE_URL}/events/${id}/register`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    const message = await response.json();
    return ({ message });
  }

  const data = await response.json();
  return ({ data });
};

// /events/:id/register

/* {
  "id": 272,
  "comment": "",
  "event": 1,
  "userid": 138
} */
