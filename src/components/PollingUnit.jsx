import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../App'

export default function pollingUnit({data, setData, lga}) {
    const [selectedLga, setSelectedLga] = useState("")
    const [selectedPU, setSelectedPU] = useState()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(true)

    const liList = results.map(result => (
                        <li key={result.party_abbreviation} className="list__item">
                            <span>{result.party_abbreviation}</span>
                            <span>{result.party_score}</span>
                        </li>
                        ))
    const displayedResults = results.length > 0 ?  (
    <>
        <h2>Results for {selectedPU?.polling_unit_name} of {selectedLga}</h2>
        <ul className="list">{ liList }</ul> 
    </>
    ): (<p className='info'>No results for this polling unit</p>)

    function handleFetch(){
        setLoading(true)
        fetch(`${BASE_URL}/polling-unit-result`,{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({id: selectedPU.uniqueid})
        })
        .then(res => res.json())
        .then(data => { setResults(data)})
        .finally(() => {
            setIsPageLoading(false)
            setLoading(false)
        })
    }

    useEffect(() => {
        setSelectedPU(data.filter(lga => lga.lga_name === selectedLga)[0])
    },[selectedLga])

    useEffect(() => {
       selectedPU?.uniqueid && handleFetch()
    },[selectedPU?.uniqueid])

    useEffect(() => {
        fetch(`${BASE_URL}/lga-with-pu`)
        .then((res) => res.json())
        .then(data => {
            setData(data)
            setSelectedLga(data[0].lga_name)
        })
    },[])

    if (isPageLoading) return (<p className='loading'>loadiing ...</p>)

  return (
        <div>
            <h1 className="heading">Find results for a polling unit</h1>
            <div className="wrapper">
                <label htmlFor="lga">Select logal Government:</label>
                <select name="lga" className="select lga" value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)}>
                    { lga.map(lga => (<option key={lga.name} value={lga.name}>{lga.name}</option>)) }  
                </select>
            </div>
            <div>
                <label htmlFor="polling"> Choose a polling Unit:</label>
                <select 
                name="polling" 
                className="select polling" 
                value={selectedPU} 
                onChange={(e) => setSelectedPU(({uniqueid: e.target.value}))}
                >
                   {
                    data
                    .filter(item => item.lga_name === selectedLga)
                    .filterDuplicate("polling_unit_name")
                    .map(pollingUnit => (
                        <option key={pollingUnit.uniqueid} value={pollingUnit.uniqueid}>
                            {pollingUnit.polling_unit_name}
                        </option>)
                        )
                   }
                </select>
            </div>
            <div>{loading ? (<p className='loading'>Loading....</p>) : displayedResults  }</div>
        </div>
  )
}

Array.prototype.filterDuplicate = function(value) {
    const duplicate = []
    const arr = []
    this.forEach(element => {
        if (!duplicate.includes(element[value])){
            duplicate.push(element[value])
            arr.push(element)
        }    
    });
    return arr
}