import React, { useContext, useEffect} from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';
import moment from 'moment'

export default () => {
  const { transactions, getTransactions, user, enums} = useContext(GlobalContext);
  useEffect(()=>{
    if(user === undefined) return;
    getTransactions().catch((err)=>console.log(err));
    // eslint-disable-next-line
  }, [user]);
  
  
  return (
    (user === undefined) ? 
        (<strong>You are not logged in.</strong>)
        :
        (transactions.length===0) ?
            (<div className='w-full h-72 text-center px-5 py-20 text-gray-500 '>No Transactions.</div>)
          :
          (<>
            <ul className="h-full ">
              {transactions
              // .filter(transaction=>moment(transaction.createdAt).isSameOrAfter(Date.now(), 'month'))
              .map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
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
          )
  )

}


  

