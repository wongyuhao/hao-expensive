import React, {useContext, useState} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas, getSymbol } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction, enums } = useContext(GlobalContext);
  const [buttonClass, setButtonClass] = useState("hidden");
  let income = 0;
  let expense = 0;
  if(transaction.amount > 0){
    income = transaction.amount;
  }else{
    expense = transaction.amount;
  }

  const toggleButtonVisibility =()=>{
    if(buttonClass === 'hidden') {
      setButtonClass('')
    }else{
      setButtonClass('hidden')
    }
  }

  const getSymbol = (currency) => {
    return (enums.currencies.filter(obj=>{return obj.code === currency })[0].symbol)
  }
  
  return (
    <li className='p-2 flex flex-col flex-nowrap border-white border-gray-500 border-b-2 w-full' onClick={()=>toggleButtonVisibility()}>
      <div className= 'flex flex-row justify-between container'>
        <div className='font-semibold'>{transaction.text}</div> 
        <div className=' lg:w-3/5  flex flex-row justify-self-end'>
         <div className='flex flex-row justify-self-end w-3/4'>
           <div className={`text-green-400 w-1/2 ${income ===0 ? "hidden lg:block lg:invisible":""}`}>{getSymbol(transaction.currency)+ ' '}{numberWithCommas(Math.abs(income))}</div>
           <div className={`text-red-500  w-1/2 ${expense ===0 ? "hidden lg:block lg:invisible":""}`}>{getSymbol(transaction.currency)+' '}{numberWithCommas(Math.abs(expense))}</div>
         </div>
          <em className='hidden lg:block px-2 w-1/4'>{transaction.source}</em>
          <button 
            className ={`delete-btn ${buttonClass} px-2`} 
            onClick={() => {
              deleteTransaction(transaction._id)
            }} >
                ❌
          </button>
        </div>
      </div>
      <div className='text-sm text-gray-500'>{(transaction.remarks) ? "> " + transaction.remarks : ""}</div>
    </li>
    
  )
}
