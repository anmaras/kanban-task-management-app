import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/userReducer';
import axios from 'axios';
// import { toast } from 'react-toastify';
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CLEAR_ALERT,
  LOGOUT_USER,
} from '../utils/actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const notify = (text) => toast.success(text);

  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };

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
    } catch (error) {
      //use the error msg from auth register controller
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      saveUserAtStorage({ user, token });
      // notify('login');
    } catch (error) {
      //use the error msg from auth login controller
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

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
