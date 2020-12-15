import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import AuthOptions from './auth/AuthOptions'
export default () => {
 const {user} = useContext(GlobalContext);
  
 return(
   <nav class='p-2 px-5 flex flex-row justify-between top bg-black text-white w-screen'>
     <div class='text-bold'>
      {user ? `Welcome, ${user.username}`:'Loading...'}
     </div>
     <div>
       <AuthOptions/>
     </div>
   </nav>
 )
}
