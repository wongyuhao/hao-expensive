import React, { createContext, useReducer, useState} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  totalCount: 0,
  error: null,
  loading: true, 
  enums: undefined,
  pathname: "/login",
}

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
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
  async function getTransactions(currpage,perpage,sources, categories) {
    
    try {
      
      if(userData.user !== undefined){
        const res = await axios.post(`/api/v1/transactions/filter/${userData.user.id}`,{
          data:{
            currpage: currpage,
            perpage:perpage,
            sources:sources,
            categories:categories,
          },
          config
        });
          dispatch({
             type: 'GET_TRANSACTIONS',
             payload: res.data.data
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

    try {
      if(userData.user !== undefined){
       const res = await axios.post(`/api/v1/transactions/${userData.user.id}`, transaction, config);
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
  
  const setPathname = (pathname) => {
    dispatch({
      type: 'SET_PATHNAME',
      payload: pathname
    })
  }

  const setEnums = (data) =>{
    dispatch({
      type: 'SET_ENUMS',
      payload: data
    })
    
  }

  const setPerpage = (val) =>{

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
    user: userData.user,
    setEnums, 
    enums: state.enums,
    pathname: state.pathname,
    setPathname,
    totalCount: state.totalCount
  }}>
    {children}
  </GlobalContext.Provider>);
}