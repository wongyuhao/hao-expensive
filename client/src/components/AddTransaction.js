import React, { useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select'
import { getSymbol } from '../utils/format';
import moment from 'moment'
import {colourStyles} from '../utils/styling'





 export default (props) => {

  const { addTransaction, enums} = useContext(GlobalContext);
  const { control, register, handleSubmit } = useForm();

  const dateGenerator  = (date) => {
    if(moment(date).isValid()){
      return(moment(date).utc().toDate())
    }else{
      return(moment().utc().toDate())
    }
  }

  const onSubmit = (data) => {
    const {text, amount, date, source, category, remarks} = data
    
    const transaction = {
      text, 
      amount: +amount,
      createdAt: dateGenerator(date),
      currency: getCurrency(source.value),
      category: category.value,
      source: source.value, 
      remarks, 
    }

    addTransaction(transaction);
    if(props.toggleModalOpen) props.toggleModalOpen();
  };

  const getCurrency = (source) => {
    let obj = enums.sources.find(obj=>{return obj.name === source })
    return (obj && obj.currency) ? obj.currency.code : 'USD'
  }
  

 
  return (enums)?(
    <form className= 'form' 
      onSubmit={
        handleSubmit(onSubmit)
      }>
      <input className= 'dark-input' type="text" placeholder="Title" name="text" ref={register({required: true})} />
      <input className= 'dark-input' step='.01' type="number" placeholder="Amount" name="amount" ref={register} />
      <hr className='mt-2 mb-4'/> 

      <Controller
        className = "mb-2.5 rounded"
        as={Select}
        rules={{ required: true }}
        styles={colourStyles}
        menuPortalTarget={document.querySelector('body')}
        options={
          enums.sources.map(obj =>
            ({
              "value" : obj.name.toUpperCase(),
              "label": obj.name.toUpperCase(),
              "color" : obj.color || "#000",
              "symbol" : getSymbol(obj.currency, enums)
            })
          )
        }
        name="source"
        control={control}
        placeholder={"Source..."}
        defaultValue={""}   
      />

      <Controller
        className = "mb-2.5 rounded "
        as={Select}
        rules={{ required: true }}
        styles={colourStyles}
        menuPortalTarget={document.querySelector('body')}
        options={
          enums.categories.map(obj =>
            ({
              "value" : obj.name,
              "label":obj.name,
              "color" : obj.color || "#000"
            })
          )
        }
        name="category"
        control={control}
        placeholder={"Category..."}
        defaultValue={""}   
      />
     

      
      <input className='rounded dark-input 'type="textarea" placeholder="Remarks" name="remarks" ref={register} />
      <input className='rounded dark-input'type="date" data-placeholder="Date" name="date" ref={register} />

      <input className='form-submit' type="submit" value='Add'/>
    </form>

  ) : <>loading...</> 
}


