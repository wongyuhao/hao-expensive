import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, Redirect} from "react-router-dom";
import {useForm} from 'react-hook-form'
import {GlobalContext} from "../../context/GlobalState";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import { ErrorMessage } from '@hookform/error-message';

export default function Register() {
  const { register, handleSubmit, errors, watch } = useForm();
  const [error, setError] = useState();
  const { user, setUserData } = useContext(GlobalContext);
  const history = useHistory();
  let isRendered = true;
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
   
   if(isRendered){
    try {
      await Axios.post("/api/v1/users/register", data);
      const loginRes = await Axios.post("/api/v1/users/login", {
        email: data.email,
        password: data.password,
      });

      
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.error && setError(err.response.data.error);
    }
  }
  };

  //do not update state once component is unmounted
  useEffect(() => {
    return () => { isRendered = false }; // use effect cleanup to set flag false, if unmounted
  });

  if(user) {
    return <Redirect to={'/'}/>
  }

  
  
  
  return (
    <div className="page">
      <p className='font-black text-2xl my-10 text-white text-opacity-90' >Register a new profile.</p>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form  className='form self-align-center' onSubmit={handleSubmit(onSubmit)}>
        <input className='form-input' type="text" placeholder="Username" name="username" ref={register} />
        <input className='form-input' type="email" placeholder="E-mail" name="email" ref={register({required: 'This field is required'})} />
        <ErrorMessage name='email' errors={errors}/>
        <input className='form-input' type="password" placeholder="Password" name="password" ref={register({required: 'This field is required', minLength: {
            value: 5,
            message: "Must exceed 5 characters"
          }})} />
        <ErrorMessage name='password' errors={errors}/>
        <input className='form-input' type="password" placeholder="Retype Password" name="passwordCheck" ref={register({required: true, validate: value =>
            value === password.current || "Passwords must match"})} />
        <ErrorMessage name='passwordCheck' errors={errors}/>

        <input className='form-submit' type="submit" value='Register'/>
    </form>
      
    </div>
  );
}