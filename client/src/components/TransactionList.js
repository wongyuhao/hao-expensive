import React, { useContext, useEffect} from 'react';
import { Transaction } from './Transaction';  
import ReactPaginate from 'react-paginate';
import { GlobalContext } from '../context/GlobalState';
import moment from 'moment'


export const TransactionList = () => {
  const { transactions, getTransactions, user} = useContext(GlobalContext);
  
  useEffect(()=>{
    if(user === undefined) return;
    getTransactions().catch((err)=>console.log(err));
    // eslint-disable-next-line
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
        <h1 className='text-4xl pt-4 pb-3 font-bold'>History</h1>
        
        <ul className="list">
          {transactions
          .filter(transaction=>moment(transaction.createdAt).isSameOrAfter(Date.now(), 'month'))
          .map(transaction => (<Transaction key={transaction._id} className='tli' transaction={transaction} />))}
        </ul>

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={3}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </>
    )
  }

  
}
