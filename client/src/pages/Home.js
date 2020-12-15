import React from 'react';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { AddTransaction } from '../components/AddTransaction';

export default () => {
  
  return (
    <>
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </>
  )
}