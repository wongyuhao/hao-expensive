import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import InfoPanel from '../components/InfoPanel'
import { AddTransaction } from '../components/AddTransaction';
import { GlobalContext } from '../context/GlobalState';
  // eslint-disable-next-line
export default () => {
  const {user} = useContext(GlobalContext);

  if(!user){
    return(
      <Redirect to ={'/login'}/>
    )
  }else{
    return (
     <div className="flex flex-col lg:flex-row  justify-around p-0 md:p-12 md:px-8 md:pb-0 w-full ">
        <div className='flex-col w-full'>
          {/* <Stats/> */}
          <InfoPanel/>
        </div>
        <div className='h-full  lg:w-1/4 max-w-sm'>
          <AddTransaction />
        </div>
      </div>
    )
  }
}