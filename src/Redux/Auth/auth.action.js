import axios from "axios"
import { API_BASE_URL } from "../../Config/api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionType"

export const loginUserAction = (loginData) => async(dispatch) =>{
  dispatch({type:LOGIN_REQUEST})
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)

    if(data.jwt){
      localStorage.setItem('jwt',data.jwt)
      
    }
    console.log('login success',data);
    dispatch({type:LOGIN_SUCCESS,payload:data.jwt})

  } catch (error) {
    console.log("----",error);
    dispatch({type:LOGIN_FAILURE,payload:error})
  }
}

export const registerUserAction = (registerData) => async(dispatch) =>{
  dispatch({type:REGISTER_REQUEST})
  try {
    const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData.data)

    if(data.jwt){
      localStorage.setItem('jwt',data.jwt)
      
    }
    console.log('register success',data);
    dispatch({type:REGISTER_SUCCESS,payload:data.jwt})

  } catch (error) {
    console.log("----re",error);
    dispatch({type:REGISTER_FAILURE,payload:error})
  }
}