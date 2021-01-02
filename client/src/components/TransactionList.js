import React, { useContext, useEffect} from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';


export default () => {
  const { transactions, getTransactions, user, enums} = useContext(GlobalContext);
  
  useEffect(()=>{
    if(user === undefined) return;
    getTransactions().catch((err)=>console.log(err));
    // eslint-disable-next-line
  }, [user]);
  
  
  return (enums) ? 
    (user === undefined) ? 
        (<strong>You are not logged in.</strong>)
        :
        (transactions.length === 0 ) ?
          (<div>No Transactions.</div>)
          :
          (<>
            <ul className="list">
              {transactions
              //.filter(transaction=>moment(transaction.createdAt).isSameOrAfter(Date.now(), 'month'))
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
          )
    :<></>

}


  

