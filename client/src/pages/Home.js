import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { AddTransaction } from '../components/AddTransaction';
import { GlobalContext } from '../context/GlobalState';

export default () => {
  const {user} = useContext(GlobalContext);

  if(!user){
    return(
      <Redirect to ={'/login'}/>
    )
  }else{
    return (
     <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    )
  }
}