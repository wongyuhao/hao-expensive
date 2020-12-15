import React, { useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useForm } from 'react-hook-form';
export const AddTransaction = () => {

  const { addTransaction } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  
  const onSubmit = ({text, amount, currency, source, remarks, date}) => {
    

    const transaction = {
      text, 
      amount: +amount,
      date,
      currency,
      source, 
      remarks, 
    }

    addTransaction(transaction);
  };

 
  return (

    
  
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Title" name="text" ref={register({required: true})} />
      <input type="number" placeholder="Amount" name="amount" ref={register} />
      <label>MYR</label>
      <input name="currency" type="radio" value="MYR" ref={register({ required: true })}/>
      <label>USD</label>
      <input name="currency" type="radio" value="USD" ref={register({ required: true })}/>
      <select name="source" ref={register({ required: true })}>
        <option value="CIMB">CIMB</option>
        <option value="MAYBANK">MAYBANK</option>
        <option value="OTHER">OTHER</option>
      </select>
      <input type="text" placeholder="Remarks" name="remarks" ref={register} />
      <input type="date" placeholder="Date" name="date" ref={register({required: true})} />

      <input type="submit" />
    </form>

  )
}
