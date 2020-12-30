import React, { useContext, useState} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select'
import backupEnums from '../utils/backupEnums';
import { dot, dotBefore } from '../utils/format';
import moment from 'moment'
import chroma from 'chroma-js'

const currGray = 'rgb(82,82,82)'
const getContrast = (color, compared) => (
  chroma.contrast(color, compared) > 2
          ? 'white'
          : 'black'
  )


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: currGray, border:'none', width: "100%", }),
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
            : currGray,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? getContrast(color, 'white')
          : chroma.contrast(color, currGray) > 4.5
            ? data.color
            : color.brighten(0.6).css(),
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  menu: provided => ({ ...provided,backgroundColor:'rgb(82,82,82)', zIndex: "9999 !important" }),
  placeholder: styles => ({ ...styles }),
  singleValue: (styles, { data }) => {
    const color = chroma(data.color);
    return ({
      ...styles, 
      maxWidth:'100%',
      color: chroma.contrast(color, currGray) > 4.5
              ? data.color
              : color.brighten(0.6).css(),
      "font-style":'italic'
   })
  }
  
  
  
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
        className = "mb-2.5 rounded "
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
     

      
      <input className='rounded dark-input 'type="textarea" placeholder="Remarks" name="remarks" ref={register} />
      <input className='rounded dark-input'type="date" data-placeholder="Date" name="date" ref={register} />

      <input className='form-submit' type="submit" value='Add'/>
    </form>

  )
}
