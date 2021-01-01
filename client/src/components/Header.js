import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {GlobalContext} from '../context/GlobalState'

// eslint-disable-next-line
export default () => {
 const { pathname, setPathname, user, setUserData, clearLocalTransactions} = useContext(GlobalContext);
 const history = useHistory();
 const register = () => {
   history.push("/register");
   setPathname('/register')
  }
 const login = () => {
  history.push("/login");
  setPathname('/login')
 }
 const logout = () => {
   setUserData({
     token: undefined,
     user: undefined,
   });
   localStorage.setItem("auth-token", "");
   clearLocalTransactions();
   history.push("/login");
   setPathname('/login')
 };
 let profile;
 let AuthOption =<></>;
 const RegisterButton = <button onClick={register} className='btn'>Register</button>
 const LoginButton = <button onClick={login} className='btn'>Log in</button>
   if(user){
     profile = <div className='rounded bg-white bg-opacity-25 mx-2.5 px-2 mt-1 text-md'>
                  🙋‍♂️ <em>{user.username}</em>
                </div>
     AuthOption = <button onClick={logout} className='btn text-yellow-400'>Log out</button>
   }else {
     AuthOption = (pathname === '/login') ? (RegisterButton) : (LoginButton);
    
   }
  
 
 return(
   <nav className='fixed py-2.5 px-4 flex flex-row justify-between align-center top bg-gray-900 text-white w-screen z-50'>
     <div className='self-center flex flex-row'>
      <p className='font-bold  text-xl'>💸</p>
      <p className='font-bold  hidden lg:visible text-xl'> Hao Expensive</p>
      {profile}
     </div>
     <div>
       {AuthOption}
     </div>
   </nav>
 )
}
