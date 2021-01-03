import React from 'react'
import InfoPanelHeader from './InfoPanelHeader'
import TransactionList from './TransactionList'
export default () => {



  return(
    <div className='infoPanel'>
      <InfoPanelHeader/>
      <TransactionList/>
    </div>
  )
}