import React, { useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select'
import {backupEnums} from '../utils/backupEnums';
import { dot, dotBefore } from '../utils/format';
import moment from 'moment'
import chroma from 'chroma-js'


const getContrast = (color, compared) => (
  chroma.contrast(color, compared) > 2
          ? 'white'
          : 'black'
  )


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      ...dotBefore(isSelected? getContrast(color, 'white') : data.color),
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? getContrast(color, 'white')
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  menu: provided => ({ ...provided, zIndex: "9999 !important" }),
  input: styles => ({ ...styles, ...dotBefore() }),
  placeholder: styles => ({ ...styles, ...dotBefore() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dotBefore(data.color) }),
};


export const AddTransaction = () => {

  const { addTransaction, enums} = useContext(GlobalContext);
  const { control, register, handleSubmit } = useForm();
  const options = (enums !== undefined) ? enums : backupEnums;

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
        rules={{ required: true }}
        styles={colourStyles}
        menuPortalTarget={document.querySelector('body')}
        options={
          options.sources.map(obj =>
            ({
              "value" : obj.name.toUpperCase(),
              "label": obj.name.toUpperCase(),
              "color" : obj.color || "#000",
              "symbol" : obj.currency.symbol
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
        rules={{ required: true }}
        styles={colourStyles}
        menuPortalTarget={document.querySelector('body')}
        options={
          options.categories.map(obj =>
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
     

      
      <input className='rounded text-black mt-2.5 p-3 'type="textarea" placeholder="Remarks" name="remarks" ref={register} />
      <input className='rounded text-black mt-2.5 p-3'type="date" data-placeholder="Date" name="date" ref={register} />

      <input className='form-submit' type="submit" value='Add'/>
    </form>

  )
}
