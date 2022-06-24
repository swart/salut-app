import React, { createContext } from 'react';

export const initialState = {
  auth: null,
  data: null,
};

export const StoreContext = createContext(initialState);

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, auth: action.payload };
    case 'LOGOUT':
      return { ...state, auth: null };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};