import * as actions from './type';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import APIModel from '../../Models/APIModal';


const fallBackErrorMessage = 'Something went wrong, please try again later!';

const login = options => async dispatch => {
  const { data, onSuccess, onError } = options;
  try {

    const { data: user } = await axios.post(`${APIModel.HOST}/login`, data, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const message = user.message;
    delete user.message;

    dispatch({
      type: actions.LOGIN,
      payload: {
        user,
      },
    });

    if (onSuccess) {
      onSuccess(message);
    }
  } catch (error) {

    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const syncWithAsyncStorage = options => async dispatch => {
  try {

    const { onSuccess, onError } = options;
    let user = await AsyncStorage.getItem('user');
    let skiped = await AsyncStorage.getItem('skiped');
    let welcome = await AsyncStorage.getItem('welcome');

    user = JSON.parse(user);


    dispatch({
      type: actions.SYNC_WITH_ASYNC_STORAGE,
      payload: {
        user, skiped, welcome
      },
    });

    if (onSuccess) {
      onSuccess({
        user, skiped, welcome
      });
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

const logout = options => async (dispatch) => {
  const { onSuccess, onError, token } = options;
  try {


    const { data: { message } } = await axios.post(`${APIModel.HOST}/logout`, {}, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    dispatch({
      type: actions.LOGOUT,
    });

    if (onSuccess) {
      onSuccess(message);
    }
  } catch (error) {
    const { data } = error.response;
    const message = data.message || error.message || fallBackErrorMessage;

    if (onError) {
      onError(message);
    }
  }
};

export {syncWithAsyncStorage, login, logout };