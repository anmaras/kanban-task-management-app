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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_ACCOUNT_BEGIN,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_ERROR,
} from '../utils/actions';
import { useModalContext } from './modalsContext';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

export const initialState = {
  delAccountLoading: false,
  isLoading: false,
  demoIsLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { closeModals } = useModalContext();
  const { user, token } = state;

  const saveUserAtStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const axiosInstance = axios.create({
    baseURL: '/api/v1/auth',
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const { user, token } = response.data;
      saveUserAtStorage({ user, token });
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //register user
  const registerUser = async (values, { setFieldError }) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axiosInstance.post('/register', values);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
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
      const { data } = await axiosInstance.post('/login', values);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
    } catch (error) {
      const response = JSON.parse(error.response.data.msg);
      const [obj] = Object.entries(response);
      setFieldError(obj[0], obj[1]);
      dispatch({
        type: LOGIN_USER_ERROR,
      });
    }
  };

  //update user
  const updateUser = async (value, { setFieldError }) => {
    if (value.name === user.name && value.email === user.email) {
      closeModals();
      return;
    }
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await axiosInstance.patch('/updateUser', value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      closeModals();
    } catch (error) {
      const response = JSON.parse(error.response.data.msg);
      const [obj] = Object.entries(response);
      setFieldError(obj[0], obj[1]);
      dispatch({
        type: UPDATE_USER_ERROR,
      });
    }
  };

  //DELETE ACCOUNT
  const deleteUserAccount = async () => {
    dispatch({ type: DELETE_USER_ACCOUNT_BEGIN });
    try {
      await axiosInstance.delete(`/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: DELETE_USER_ACCOUNT_SUCCESS });
      closeModals();
      logoutUser();
    } catch (error) {
      dispatch({ type: DELETE_USER_ACCOUNT_ERROR });
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
        updateUser,
        deleteUserAccount,
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
