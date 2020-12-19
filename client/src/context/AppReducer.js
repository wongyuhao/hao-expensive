  // eslint-disable-next-line
export default (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':{
      
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    }
      
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
   case 'CLEAR_LOCAL':
     return{
       ...state,
       transactions: []
     }

    case 'SET_ENUMS':
      return{
        ...state,
        enums:action.payload
      }
    case 'SET_PATHNAME':
      return {
        ...state,
        pathname: action.payload
      }
    default:
      return state;
  }
}