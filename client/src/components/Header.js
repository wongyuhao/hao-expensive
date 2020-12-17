import React, {useContext} from 'react'

import {GlobalContext} from '../context/GlobalState'
import AuthOptions from './auth/AuthOptions'

// eslint-disable-next-line
export default () => {
 const {user} = useContext(GlobalContext);
 let profile;
 
   if(user){
     profile = <div className='rounded bg-white bg-opacity-25 mx-2.5 px-2 mt-1'>🙋‍♂️ <em>{user.username}</em></div>
   }
 
 return(
   <nav className='fixed py-2.5 px-4 flex flex-row justify-between align-center top bg-gray-900 text-white w-screen'>
     <div className='self-center flex flex-row'>
      <p className='font-bold text-xl'>💸 Hao Expensive</p>
      {profile}
     </div>
     <div>
       <AuthOptions/>
     </div>
   </nav>
 )
}
