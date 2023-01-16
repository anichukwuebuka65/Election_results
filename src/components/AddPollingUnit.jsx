import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../App'

export default function AddPollingUnit({setShowScore, setPUId, message, setMessage}) {
    const [fields, setFields] = useState({})
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)

    function handleChange(e) {
        setFields(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        fetch(`${BASE_URL}/add-polling-unit`,{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(fields)
        })
        .then(res => res.json())
        .then((data) => {setPUId(data); setShowScore(true)})
        .catch(() => setErr("err"))
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setTimeout(() => setMessage(""),2000)
    },[])

  return (
    <div>
        <h1>Add a Polling Unit</h1>
        {message ? <p className='success_message'>{message}</p> : null}
        {loading ? <p className='loading'>loading...</p> : null}
        <form className="add_score" onSubmit={handleSubmit}>
            <div>
                 <label htmlFor="polling_unit_id">Polling unit id:</label>
                <input value={fields["unit_id"]} onChange={handleChange} type="text" name="unit_id" required/>
            </div>
            <div>
                <label htmlFor="ward_id">Ward unit id:</label>
                <input  value={fields["ward_id"]} onChange={handleChange} type="text" name="ward_id" required/>
            </div>
            
            <div>
                <label htmlFor="lga_id">Lga id:</label>
                <input  value={fields["lga_id"]} onChange={handleChange} type="text" name="lga_id" required/>
            </div>

            <div>
                <label htmlFor="unique_ward_id">Unique ward id:</label>
                <input  value={fields["unique_ward_id"]} onChange={handleChange} type="text" name="unique_ward_id" required/>
            </div>
            
            <div>
                <label htmlFor="polling_unit_name">Polling unit name:</label>
                <input  value={fields["polling_unit_name"]} onChange={handleChange} type="text" name="polling_unit_name" required/>
            </div>
            
            <div>
                 <label htmlFor="polling_unit_number">Polling unit name:</label>
                <input  value={fields["polling_unit_number"]} onChange={handleChange} type="text" name="polling_unit_number" required/>
            </div>

            <div>
                 <label htmlFor="polling_unit_description">Polling unit description:</label>
                <input value={fields["polling_unit_description"]} onChange={handleChange} type="text" name="polling_unit_description" required/>
            </div>

            <button className='button btn' type="submit">Add Polling Unit</button>
        </form>
    </div>
  )
}
