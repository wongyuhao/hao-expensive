import React, {useEffect, useContext} from 'react';
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/Header'
import {  GlobalContext } from './context/GlobalState';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Axios from 'axios';
// eslint-disable-next-line
export default () => {
  const { setUserData, setEnums} = useContext(GlobalContext);

  const checkLogin = async () => {  
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      localStorage.setItem('auth-token', "");
      token = "";
    }
    const tokenRes = await Axios.post('/api/v1/users/tokenIsValid', null, {
      headers: {"x-auth-token": token}
    }).catch(error => {
      console.log(error.response)
    });

    if(tokenRes.data) {
      const userRes = await Axios.get('/api/v1/users/get', {
        headers: {"x-auth-token": token}
      }).catch(error => {
       throw error
      })

      const enumRes = await Axios.post('/api/v1/enums',{
          'username' : userRes.data.username
      })
      setEnums(enumRes.data)

      setUserData({
        token,
        user: userRes.data
      })
    }
  }
  useEffect(()=>{
    
    try {
      checkLogin();
      
    } catch (err) {
      console.error(err.message);
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className='flex flex-col'>
      <BrowserRouter>
      <Header  />
      <div className='pt-10'>
      <Switch >
        <Route exact path="/" component ={Home}/>
        <Route exact path="/login" component ={Login}/>
        <Route exact path="/register" component ={Register}/>
      </Switch>
      </div>
      
      </BrowserRouter>
    </div>

  );
}
