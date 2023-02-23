import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/userReducer';
import axios from 'axios';
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../utils/actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

export const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveUserAtStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  //register user
  const registerUser = async (values, { setFieldError }) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', values);
      const { user, token } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      saveUserAtStorage({ user, token });
    } catch (error) {
      const response = JSON.parse(error.response.data.msg);
      const [obj] = Object.entries(response);

      setFieldError(obj[0], obj[1]);

      dispatch({
        type: REGISTER_USER_ERROR,
      });
    }
  };

  //login user
  const loginUser = async (values, { setFieldError }) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', values);
      const { user, token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      saveUserAtStorage({ user, token });
    } catch (error) {
      const response = JSON.parse(error.response.data.msg);
      const [obj] = Object.entries(response);

      setFieldError(obj[0], obj[1]);

      dispatch({
        type: LOGIN_USER_ERROR,
      });
    }
  };

  //logout user
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserStorage();
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
//export a small hook for convenient when destructuring on components
export const useUserContext = () => {
  return useContext(UserContext);
};
