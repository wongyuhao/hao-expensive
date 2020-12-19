import React, {useContext, useState} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas, getSymbol, getCategoryColor, getSourceColor, dot } from '../utils/format';
import moment from 'moment'
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


  return (
  <div className='flex  mx-2 my-1 flex-row flex-nowrap rounded'>
    <button 
    className ={`delete-btn ${buttonClass} m-0 px-2 bg-red-600 font-black`} 
    onClick={() => {
      deleteTransaction(transaction._id)
    }} >
        ✕
    </button> 
    <li className='p-2 flex flex-row flex-nowrap w-full bg-gray-800 border-gray-700 shadow-sm  ' onClick={()=>toggleButtonVisibility()}>
      <div className= 'flex flex-row justify-between container' style={{borderRight:`3px solid ${getSourceColor(transaction.source, enums)}`}}>

        <div className='flex flex-row items-center'>
        <div style={dot(getCategoryColor(transaction.category, enums))} />
    
          
          <div className='font-semibold' >{transaction.text}</div> 
        </div>
        
        <div className=' lg:w-2/5  flex flex-row justify-self-end mr-5'>

         
            <div className={`text-green-400 text-right w-1/2 whitespace-nowrap ${income ===0 ? "hidden lg:block lg:invisible":""}`}>
              {getSymbol(transaction.currency, enums)+ ' '}{numberWithCommas(Math.abs(income))}
            </div>
            <div className={`text-red-500  text-right w-1/2 whitespace-nowrap ${expense ===0 ? "hidden lg:block lg:invisible":""}`}>
              {getSymbol(transaction.currency, enums)+' '}{numberWithCommas(Math.abs(expense))}
            </div>
     

        </div>
      </div>
      
      <div className='text-sm text-gray-500'>{(transaction.remarks) ? "> " + transaction.remarks : ""}</div>
      
    </li>



    
  </div>
  )
}
