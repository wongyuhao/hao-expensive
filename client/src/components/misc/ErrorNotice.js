import React from "react";
import {toTitleCase} from '../../utils/format'
import {ErrorMessage } from '@hookform/error-message';
export default function ErrorNotice(props) {
  
  if(props.message && props.clearError){
    return (
      <div className='flex flex-row err w-full justify-between'>
        <span className=''>⚠ {toTitleCase(props.message)}</span>
        <button className= ''onClick={props.clearError}>X</button>
      </div>
    );
  }else if( props.errors && props.name) {
    return(
      <ErrorMessage
        errors={props.errors}
        name={props.name}
        render={({ message }) => <p className='err'>⚠ {message}</p>}
      />
    )
  }

  
}