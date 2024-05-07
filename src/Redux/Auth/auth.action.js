import axios from "axios"
import { api, API_BASE_URL } from "../../Config/api"
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_REQUEST, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)

    if (data.token) {
      localStorage.setItem('jwt', data.token)

    }
    console.log('login success', data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })

  } catch (error) {
    console.log("----", error);
    dispatch({ type: LOGIN_FAILURE, payload: error })
  }
}

export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST })
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data)

    if (data.token) {
      localStorage.setItem('jwt', data.token)

    }
    console.log('register success', data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })

  } catch (error) {
    console.log("----re", error);
    dispatch({ type: REGISTER_FAILURE, payload: error })
  }
}

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST })
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
    )

    console.log('profile---', data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data })

  } catch (error) {
    console.log("----re", error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error })
  }
}


export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST })
  try {
    const { data } = await api.put(
      `${API_BASE_URL}/api/users`, reqData
    )

    console.log('updateprofile---', data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })

  } catch (error) {
    console.log("----re", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error })
  }
}

export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST })
  try {
    const { data } = await
      api.get(`/api/users/search?query=${query}`)

    console.log('searchuser---', data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data })

  } catch (error) {
    console.log("----re", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error })
  }
}

export const findUserById = (id) => async (dispatch) => {
  dispatch({ type: FIND_USER_BY_ID_REQUEST })
  try {
    const { data } = await
      api.get(`/api/users/${id}`)

    console.log('searchuser by id---', data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data })

  } catch (error) {
    console.log("----re", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error })
  }
}

export const followUser = (id) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST })
  try {
    const { data } = await
      api.put(`/api/users/follow/${id}`)

    console.log('follow user---', data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data })

  } catch (error) {
    console.log("----err", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error })
  }
}

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST })
  try {
    const { data } = await api.get('/api/users')

    console.log('get user---', data);
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data })

  } catch (error) {
    console.log("----err", error);
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error })
  }
}