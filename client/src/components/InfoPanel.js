import React from 'react'
import InfoPanelHeader from './InfoPanelHeader'
import TransactionList from './TransactionList'
export default () => {



  return(
    <div className='bg-gray-900 px-2.5 py-3.5 min-h-full rounded-lg lg:mr-3  overflow-y-scroll' style={{maxHeight:'80vh'}}>
      <InfoPanelHeader/>
      <TransactionList/>
    </div>
  )
}