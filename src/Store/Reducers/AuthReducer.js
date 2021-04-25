import * as actions from '../Actions/type';
import { AsyncStorage } from 'react-native';
const initSate = {
  user: undefined,
  welcome: 'false',
};

const AuthReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.LOGIN: {
      const { user } = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user,
      };
    }

    case actions.SYNC_WITH_ASYNC_STORAGE: {
      const { user,skiped, welcome } = action.payload;
      return {
        ...state,
        user,
        skiped,
        welcome,
      };
    }
    
    case actions.LOGOUT: {
      AsyncStorage.removeItem('user');
      return {
        ...state,
        user: null,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default AuthReducer;
