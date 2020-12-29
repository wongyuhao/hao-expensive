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
  
  
  return (
    <div className='bg-gray-900 px-2.5 py-3.5 min-h-full rounded-lg lg:mr-3  overflow-y-scroll' style={{maxHeight:'80vh'}}>
      <div className='flex flex-row justify-between p-3'>
        <h1 className='text-4xl  font-bold'>History</h1>
        <button>Filter</button>
      </div>
    
    
    
    {(user === undefined) ? 
        <strong>You are not logged in.</strong>
        :
        <>
        <ul className="list">
          {transactions
          .filter(transaction=>moment(transaction.createdAt).isSameOrAfter(Date.now(), 'month'))
          .map(transaction => (<Transaction key={transaction._id} className='tli' transaction={transaction} />))}
        </ul>
        {/* <ReactPaginate
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
        /> */}
        </>
    }</div>

    
  )

}


  

