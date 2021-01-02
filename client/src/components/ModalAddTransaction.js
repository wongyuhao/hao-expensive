import React , {useState} from 'react'
import AddTransaction from './AddTransaction'
export default () =>{
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModalOpen = () =>{
    setModalOpen(!modalOpen);
  }
  return(
    <>
    <div className={`modalBtn z-50 fixed bottom-0 right-0 ${modalOpen?'rotateIn':'rotateOut'}`} onClick ={()=>toggleModalOpen()}>
    <svg style={{ 'height': '40px', 'stroke': 'white' }} viewBox="0 0 100 100">
      <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
      <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
    </svg>
    </div>
    <div>
    <div className={`${modalOpen?'flex':'invisible'} fixed w-screen bg-black justify-center items-center bg-opacity-80 h-screen`}>
        <AddTransaction className={``} toggleModalOpen={toggleModalOpen}/>
    </div>
    </div>
    </>
  )
}