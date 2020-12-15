import React, { createContext, useReducer, useState} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true, 
  
  
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  // Actions
  async function getTransactions() {
    
    try {
      if(userData.user !== undefined){
        const res = await axios.get(`/api/v1/transactions/${userData.user.id}`);
        console.log('get')
        console.log(res.data.data.transactions);
       dispatch({
          type: 'GET_TRANSACTIONS',
          payload: res.data.data.transactions
       });
      }
      
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }



  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });

    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      if(userData.user !== undefined){
       const res = await axios.post(`/api/v1/transactions/${userData.user.id}`, transaction, config);
       console.log('add res'); 
       console.log(res)
       dispatch({
         type: 'ADD_TRANSACTION',
         payload: res.data.data.transaction
        });
      }
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  const clearLocalTransactions = ()=>{
    dispatch({
      type: 'CLEAR_LOCAL'
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction, 
    clearLocalTransactions,
    userData,
    setUserData,
    user: userData.user
   
  }}>
    {children}
  </GlobalContext.Provider>);
}