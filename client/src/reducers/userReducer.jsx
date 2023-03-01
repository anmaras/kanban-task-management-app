import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGIN_TEST_USER_BEGIN,
  LOGIN_TEST_USER_SUCCESS,
  LOGIN_TEST_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_ACCOUNT_BEGIN,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_ERROR,
} from '../utils/actions';

import { initialState } from '../context/userContext';

const userReducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_TEST_USER_BEGIN) {
    return { ...state, demoIsLoading: true };
  }

  if (action.type === LOGIN_TEST_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      demoIsLoading: false,
    };
  }

  if (action.type === LOGIN_TEST_USER_ERROR) {
    return {
      ...state,
      demoIsLoading: false,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DELETE_USER_ACCOUNT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_USER_ACCOUNT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === DELETE_USER_ACCOUNT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default userReducer;
