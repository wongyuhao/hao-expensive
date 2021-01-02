import React from 'react'
import InfoPanelHeader from './InfoPanelHeader'
import TransactionList from './TransactionList'
export default () => {



  return(
    <div className='bg-gray-900 px-2.5 rounded-lg lg:mr-3 pb-20 lg:pb-5 max-h-full overflow-y-scroll infoPanel'>
      <InfoPanelHeader/>
      <TransactionList/>
    </div>
  )
}