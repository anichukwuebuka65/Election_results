import { useState } from 'react'
import NewPollingUnit from './components/NewPollingUnit'
import PollingUnit from './components/PollingUnit'
import TotalSum from './components/TotalSum'

export const BASE_URL = "https://electionresultsbackend-production.up.railway.app"

function App() {
  const [page, setPage] = useState("pollingUnit")

  return(
    <div className="app">
      <PageComponent page={page}/>
      <div className='btn_container'>
        <button onClick={() => setPage("pollingUnit")}>Polling unit page</button>
        <button onClick={() => setPage("totalSum")}>Total sum page</button>
        <button onClick={() => setPage("addScore")}>Add PU/scores page</button>
      </div>
    </div> 
  )
}

function PageComponent ({page}) {
  const [data, setData] = useState([])

  const lga = data.filterDuplicate("lga_name").map(item => ({id:item.lga_id,name:item.lga_name}))

  switch(page) {
    case "pollingUnit":
      return <PollingUnit {...{data, setData, lga}}/>
    case "totalSum":
      return <TotalSum lga={lga}/>
    case "addScore":
      return <NewPollingUnit />
    default:
      return <PollingUnit/>
  }
}


export default App
