import { FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_SUCCESS, GET_ALL_USER_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  findUser:null,
  searchUser: [],
  listUser:[]
}
export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: null }

    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null }

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, findUser: action.payload,user:action.payload ,error: null }

    case FIND_USER_BY_ID_SUCCESS:
    case FOLLOW_USER_SUCCESS:
      return { ...state, loading: false, findUser: action.payload, error: null }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:

      return { ...state, jwt: action.payload, loading: false, error: null }
    case SEARCH_USER_SUCCESS:
      return { ...state, searchUser: action.payload, loading: false, error: null }

    case GET_ALL_USER_SUCCESS:
      return { ...state, loading: false, listUser: action.payload, error: null }
    

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:

      return { ...state, loading: false, error: action.payload }


    default:
      return state;
  }
}