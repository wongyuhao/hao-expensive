import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'
const Stats = () => {
  const { transactions } = useContext(GlobalContext);


  const totalFilter = (arr, field, value) => {
    const total = (
      arr
        .filter(item => item[field] === value)
        .reduce((acc, item) => (acc += item.amount), 0)
      )
        .toFixed(2);
    return total
  }
 
  const incomeFilter = (arr, field, value) => {
    const income = (
      arr
        .filter(item => item[field] === value)
        .filter(item => item.amount > 0)
        .reduce((acc, item) => (acc += item.amount), 0)
      )
        .toFixed(2);
    return income
  }

  const expenseFilter = (arr, field, value) => {
    const expense = (
      arr
        .filter(item => item[field] === value)
        .filter(item => item.amount < 0)
        .reduce((acc, item) => (acc += item.amount), 0) *-1
      )
        .toFixed(2);
    return expense
  }
  

  const Box = ({children}) =>{
    return <div className='border-white border-2 border-solid p-5'>
      {children}
    </div>
  }

  return (
    <div className='flex flex-row flex-wrap '>
    <Box> USD Total: {totalFilter(transactions, 'currency', 'USD')}  </Box>
    <Box> MYR Total: {totalFilter(transactions, 'currency', 'MYR')}</Box>
    <Box> USD Income: {incomeFilter(transactions, 'currency', 'USD')}</Box>
    <Box> MYR Income: {incomeFilter(transactions, 'currency', 'MYR')}</Box>
    <Box> USD Expense: {expenseFilter(transactions, 'currency', 'USD')};</Box>
    <Box> MYR Expense: {expenseFilter(transactions, 'currency', 'MYR')};</Box>
    <Box> Maybank Total: {totalFilter(transactions,'source', 'MAYBANK')}</Box>
    
    </div>
  )

  
}

export default Stats;