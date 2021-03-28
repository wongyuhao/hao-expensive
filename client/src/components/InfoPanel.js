import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'
import InfoPanelFooter from './InfoPanelFooter'
import InfoPanelHeader from './InfoPanelHeader'
import TransactionList from './TransactionList'
export default () => {
  const {getTransactions, totalCount} = useContext(GlobalContext)
  const [selectedCategories, setCategories] = useState([]);
  const [selectedSources, setSources] = useState([]);
  const [perpage, setPerpage] = useState(10);
  const [currpage, setCurrpage] = useState(0);
  const handleCategoryChange = (categories) => {
    setCategories(categories || [])
    getTransactions(
      currpage,
      perpage,
      selectedSources.map(i=>i.value), 
      categories?.map(i=>i.value) || [],
      )
  }

  const handleSourceChange = (sources) => {
    setSources(sources || [])
    getTransactions(
      currpage,
      perpage,
      sources?.map(i=>i.value) || [], 
      selectedCategories.map(i=>i.value))
  }

  const handlePaginateClick = ({selected}) => {
    setCurrpage(selected);
  }

  const handleGetTransactions = () => {
    getTransactions(
      currpage, 
      perpage,
      selectedSources.map(i=>i.value),
      selectedCategories.map(i=>i.value)
    )
    .catch(err=>console.error(err))
  }

  useEffect(()=>{
    handleGetTransactions();
    // eslint-disable-next-line
  }, [currpage,perpage]);

  return(
    <div className='infoPanel'>
      <InfoPanelHeader
        selectedCategories = {selectedCategories}
        selectedSources = {selectedSources}
        handleCategoryChange = {handleCategoryChange}
        handleSourceChange = {handleSourceChange}
        totalCount = {totalCount}
        perpage = {perpage}
        setPerpage={setPerpage}
        />
      <TransactionList 
        className='overflow-y-scroll'
        handleGetTransactions= {handleGetTransactions}/>
      <InfoPanelFooter
        currpage = {currpage}
        totalCount = {totalCount}
        perpage = {perpage}
        handlePaginateClick = {handlePaginateClick}
        />
    </div>
  )
}