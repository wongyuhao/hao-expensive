import React, { useContext, useEffect} from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';



export const TransactionList = () => {
  const { transactions, getTransactions, user} = useContext(GlobalContext);
  
 

  useEffect(()=>{
    if(user === undefined) return;
    getTransactions().catch((err)=>console.log(err));
  }, [user]);
  
  if(user === undefined) {
    return (
      <>
        <h3>History</h3>
        
        <em>Loading...</em>
      </>
    )
  }else{
    
    return (
      <>
        <h3>History</h3>
        
        <ul className="list">
          {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
        </ul>
      </>
    )
  }

  
}
