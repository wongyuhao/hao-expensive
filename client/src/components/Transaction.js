import React, {useContext, useState} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas, getSymbol, getCategoryColor, getSourceColor, dot } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction, enums } = useContext(GlobalContext);
  const [buttonClass, setButtonClass] = useState("hidden");
  const [remarksClass, setRemarksClass] = useState("hidden")
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

  const toggleRemarksVisiblity =()=>{
    if(remarksClass === 'hidden') {
      setRemarksClass('')
    }else{
      setRemarksClass('hidden')
    }
  }


  return (
  <div className='flex  mx-2 my-1 flex-row flex-nowrap rounded-lg bg-red-600'>
    <button 
    className ={`delete-btn ${buttonClass} m-0 px-2 bg-red-600 font-black rounded`} 
    onClick={() => {
      deleteTransaction(transaction._id)
    }} >
        ✕
    </button> 
    <li className='p-2 flex flex-col flex-nowrap w-full bg-gray-800 border-gray-700 shadow-sm rounded '>
      <div className= 'flex flex-col md:flex-row justify-between w-full' style={{borderRight:`3px solid ${getSourceColor(transaction.source, enums)}`}}>

        <div className='flex flex-row items-center'>
          <div 
            className='cursor-pointer'
            style={dot(getCategoryColor(transaction.category, enums))}  
            onClick={()=>toggleButtonVisibility()}
          />
          <div 
            className={`font-semibold flex flex-row items-center overflow-ellipsis ${transaction.remarks ? 'cursor-pointer':""}`} 
            onClick={()=>toggleRemarksVisiblity()} >
              <p>{transaction.text}</p>
              <p className='px-2 text-gray-500'>{(transaction.remarks && remarksClass ==='hidden')? "...":""}</p>
          </div> 
        </div>
        
        <div className=' lg:w-2/5  flex flex-row justify-self-end pr-5'>

         
            <div className={`text-green-400 text-right  lg:w-1/2 whitespace-nowrap  ${income ===0 ? "hidden lg:block lg:invisible":""}`}>
              {getSymbol(transaction.currency, enums)+ ' '}{numberWithCommas(Math.abs(income))}
            </div>
            <div className={`text-red-500  text-right  Lg:w-1/2 whitespace-nowrap ${expense ===0 ? "hidden lg:block lg:invisible":""}`}>
              {getSymbol(transaction.currency, enums)+' '}{numberWithCommas(Math.abs(expense))}
            </div>
     

        </div>
      </div>
      
      {
        (transaction.remarks) ?
        <div className={`ml-6 text-sm text-gray-500 ${remarksClass}`}>{ ">"  + transaction.remarks }</div>
        :
        <></>
      }
      
      
    </li>



    
  </div>
  )
}
