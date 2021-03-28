import React, { useContext, useEffect, useState} from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export default (props) => {
  const { transactions, user} = useContext(GlobalContext);

  useEffect(()=>{
    if(user === undefined) return;
    props.handleGetTransactions();
    // eslint-disable-next-line
  }, [user]);
  
  return (
    (user === undefined) ? 
        (<strong>You are not logged in.</strong>)
        :
        (transactions.length===0) ?
            (<div className='w-full h-72 text-center px-5 py-20 text-gray-500' style={{minHeight:'50vh'}}>No Transactions.</div>)
          :
          (<>
            <ul className="overflow-y-scroll" style={{minHeight:'50vh'}}>
              {transactions
              .map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
            </ul>
            </>
          )
  )

}


  

