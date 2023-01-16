import React from 'react'
import { useState } from 'react'
import AddPollingUnit from './AddPollingUnit'
import AddScore from './AddScore'

export default function NewPollingUnit() {
    const[showScore, setShowScore] = useState(false)
    const [PUId, setPUId] = useState("")
    const [message, setMessage] = useState("hell")

  return (
    <div >
       {showScore ? 
       <AddScore PUId={PUId.id} setShowScore={setShowScore} setMessage={setMessage}/> : 
       <AddPollingUnit {...{setShowScore, setPUId, message, setMessage}}/>} 
    </div>
  )
}
