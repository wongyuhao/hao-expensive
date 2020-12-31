import React, {useEffect, useContext} from 'react';
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/Header'
import {  GlobalContext } from './context/GlobalState';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Axios from 'axios';
import backupEnums from './utils/backupEnums'
// eslint-disable-next-line
export default () => {
  const {enums, setUserData, setEnums} = useContext(GlobalContext);
  

  const getEnums = async(test = true) => {
    try {
      if(!test){
        const enumRes = await Axios.get('/api/v1/enums');
        if(enumRes){
          const {data} = enumRes;
          setEnums(data)
        }
      }else{
        alert('test mode enabled')
        setEnums(backupEnums);
      }
      
    } catch (err) {
      throw err;
    }
  }

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
      });
  
      setUserData({
        token,
        user: userRes.data
      })
    }



  }
  useEffect(()=>{
    
    try {
      checkLogin();
      getEnums(true);
      
      
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
