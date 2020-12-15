import React, {useContext, useEffect} from 'react'

import {GlobalContext} from '../context/GlobalState'
import AuthOptions from './auth/AuthOptions'
export default () => {
 const {user} = useContext(GlobalContext);
 let path = window.location.pathname;
 let profile;
 
   if(user){
     profile = <div className='rounded bg-white bg-opacity-25 mx-2.5 px-2 italic'>{user.username}</div>
   }
 
 return(
   <nav className='py-2.5 px-4 flex flex-row justify-between align-center top bg-gray-900 text-white w-screen'>
     <div className='self-center flex flex-row'>
      <p className='font-bold'>Hao Expensive</p>
      {profile}
     </div>
     <div>
       <AuthOptions/>
     </div>
   </nav>
 )
}
