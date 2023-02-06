import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/userReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
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

const notifySuccess = (text) =>
  toast.success(text, {
    position: 'bottom-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

const notifyError = (text) =>
  toast.error(text, {
    position: 'bottom-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

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
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      const { user, token } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      saveUserAtStorage({ user, token });
      notifySuccess(`${user.name}, welcome! ❤️`);
    } catch (error) {
      //use the error msg from auth register controller
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      notifyError(error.response.data.msg);
    }
  };

  //login user
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      saveUserAtStorage({ user, token });
      notifySuccess(`${user.name},you manage to login gracefully`);
    } catch (error) {
      //use the error msg from auth login controller
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      notifyError(error.response.data.msg);
    }
  };

  //logout user
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    notifySuccess(`${state.user.name} has left the building 👋`);
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
