import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BASE_URL } from '../App'

export default function AddScore({PUId, setShowScore, setMessage}) {
    const[ parties, setParties] = useState([])
    const [scores, setScores] = useState({})
    const [enteredBy ,setEnterdBy] = useState("")
    const[loading, setLoading] = useState(true)

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${BASE_URL}/add-score`,{
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                scores,
                PUId,
                enteredBy
            })
        })
        .then(res => res.json())
        .then((data) => {
            setMessage("scores added successfully")
            setShowScore(false)
        })
        .catch(err => console.log(err))
    }

    function handleChange(e) {
        setScores(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        fetch(`${BASE_URL}/party`)
        .then(res => res.json())
        .then(party => setParties(party))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    },[])

    if (loading) return (<p className='loading'>loading ...</p>)

    return (   
        <div >
            <h1>Add Scores for this polling unit</h1>
            <form className='form' onSubmit={handleSubmit}>

                {parties.map(({partyname})=> 
                <div key={partyname}>
                    <label htmlFor={partyname}>{partyname}:</label>
                    <input value={scores[partyname]} type="text" name={partyname} onChange={handleChange} required/>
                </div>)}
                    <div className='span_two'>
                        <label htmlFor="enteredBy">Official's name:</label>
                        <input value={enteredBy} onChange={(e) => setEnterdBy(e.target.value)} type="text" id="enteredBy" required/>
                    </div>
                
                <button className='button' type="submit">Submit</button>
            </form>
            <button onClick={() => setShowScore(false)} className="add_unit">Add another polling unit</button>
        </div>   
    )
}
