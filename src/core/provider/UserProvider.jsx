import React, { createContext, useReducer } from "react";

export const UserStateContext = createContext("user");

// 유저 초기 값
export const INITIAL_STATE = {
  id: 0,
  email: "",
  name: "",
  role: "",
  uid: "",
  accessToken: "",
};

export const reducer = (_state, { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      return payload;
    case "INIT_USER":
      return INITIAL_STATE;
    default:
      break;
  }
};

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <UserStateContext.Provider value={{ state, dispatch }}>
      {children}
    </UserStateContext.Provider>
  );
}
