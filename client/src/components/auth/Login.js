import React, { useState, useContext, useEffect } from "react";
import { useHistory , Redirect} from "react-router-dom";
import { GlobalContext } from '../../context/GlobalState';
import {useForm} from 'react-hook-form'
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState();
  const { user, setUserData } = useContext(GlobalContext);
  const history = useHistory();
  let isRendered = true
  const onSubmit = async (data) => {
    if(isRendered){
    try {
      const loginUser = data;
      const loginRes = await Axios.post(
        "/api/v1/users/login",
        loginUser
      ).then( (loginRes) => {
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
      }).then(isRendered= false)
      .catch((err)=> {throw err});
      
    } catch (err) {
      err.response.data.error && setError(err.response.data.error);
    }
  }
  };


  //do not update state once component is unmounted
  useEffect(() => {
  // eslint-disable-next-line
    return () => { isRendered = false }; // use effect cleanup to set flag false, if unmounted
  },[]);

  if(user) {
    return <Redirect to={'/'}/>
  }

  return (
    <div className="page">
      <p className='font-light text-2xl my-10 text-white' >Welcome back.</p>
      
      <form  className='form self-align-center' onSubmit={handleSubmit(onSubmit)}>
        <input className='form-input' type="email" placeholder="E-mail" name="email" ref={register({required: 'This field is required'})} />
        <ErrorNotice name='email' errors={errors}/>
        <input className='form-input' type="password" placeholder="Password" name="password" ref={register({required: 'This field is required', minLength: {
            value: 5,
            message: "Must exceed 5 characters"
          }})} />
        <ErrorNotice name='password' errors={errors}/>
        
        {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
        <input className='form-submit' type="submit" value='Log In'/>
    </form>
    </div>
  );
}