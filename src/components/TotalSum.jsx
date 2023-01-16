import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../App'

export default function TotalSum({lga}) {
  const [loading, setLoading] = useState(false)
  const [selectedLga, setSelectedLga] = useState(lga[0])
  const [sum , setSum] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/total-results`,{
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({id: selectedLga.id})
    })
    .then(res => res.json())
    .then(sum => setSum(sum[0].sum))
    .finally(() => setLoading(false))
  },[selectedLga])

  return (
    <div className="wrapper">
            <h1 className="heading">Sum Total of each LGA</h1>
            <div >
                <label htmlFor="lga">Select logal Government:</label>
                <select className="select lga" value={selectedLga.name} onChange={(e) => setSelectedLga({id: e.target.value})}>
                  {lga.map(lga => (<option key={lga.name} value={lga.id} >{lga.name}</option>))}
                </select>
                {loading? (<p className='loading'>loading...</p>) : (<p>Sum Total of results for Aniocha LGA : {sum ? sum : 0} </p>)}
            </div>
        </div>
  )
}
