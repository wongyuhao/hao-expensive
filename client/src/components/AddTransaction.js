import React, { useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select'
import {backupEnums} from '../utils/backupEnums';
import { dot } from '../utils/format';

const selectStyle = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
  }),
  container: (provided, state) => ({
    ...provided,
    
  }),
  
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition, ...dot()};
  // }
}




export const AddTransaction = () => {

  const { addTransaction, enums} = useContext(GlobalContext);
  const { control, register, handleSubmit } = useForm();
  const options = (enums !== undefined) ? enums : backupEnums;
  const [currency, setCurrency] = useState(options.currencies[0])
  const [source, setSource] = useState('CIMB');
  
  const onSubmit = (data) => {
    // console.log(data);
    const {text, amount, date, source, category, remarks} = data
    const transaction = {
      text, 
      amount: +amount,
      date,
      currency: getCurrency(source.value),
      category: category.value,
      source: source.value, 
      remarks, 
    }

    addTransaction(transaction);
  };

  const getCurrency = (source) => {
    return (enums.sources.filter(obj=>{return obj.name === source })[0].currency.code)
  }
  
 
  return (
    <form className= 'form ' onSubmit={handleSubmit(onSubmit)}>
      <input className= 'form-input' type="text" placeholder="Title" name="text" ref={register({required: true})} />
      <input className= 'form-input' step='.01' type="number" placeholder="Amount" name="amount" ref={register} />
      <hr className='my-4'/> 

      <Controller
        className = "mt-2.5 rounded "
        as={Select}
        styles={{...selectStyle, menu: provided => ({ ...provided, zIndex: "9999 !important" })}}
        menuPortalTarget={document.querySelector('body')}
        options={
          options.sources.map(obj =>
            ({
              "value" : obj.name.toUpperCase(),
              "label": `[${obj.currency.symbol}]\t` + obj.name.toUpperCase()
            })
          )
        }
        name="source"
        control={control}
        placeholder={"Source..."}
        defaultValue={""}   
      />

      <Controller
        className = "mt-2.5 rounded "
        as={Select}
        styles={{...selectStyle, menu: provided => ({ ...provided, zIndex: "9999 !important" })}}
        menuPortalTarget={document.querySelector('body')}
        options={
          options.categories.map(obj =>
            ({
              "value" : obj.name,
              "label":obj.name
            })
          )
        }
        name="category"
        control={control}
        placeholder={"Category..."}
        defaultValue={""}   
      />
     

      
      <input className='rounded text-black mt-2.5 p-3 'type="textarea" placeholder="Remarks" name="remarks" ref={register} />
      <input className='rounded text-black mt-2.5 p-3'type="date" data-placeholder="Date"  name="date" ref={register} />

      <input className='form-submit' type="submit" value='Add'/>
    </form>

  )
}
