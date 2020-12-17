import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Stats from '../components/Stats';
import { TransactionList } from '../components/TransactionList';
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
     <div className="flex flex-col lg:flex-row  justify-around p-5 lg:p-12 w-screen overflow-none ">
        <div className='flex-col lg:mr-10 overflow-scroll'>
          <Stats/>
          <TransactionList />
        </div>
        <div className='h-full lg:w-1/5 max-w-sm'>
          <AddTransaction />
        </div>
      </div>
    )
  }
}