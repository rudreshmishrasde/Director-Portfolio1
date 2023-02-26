import axios from 'axios'

import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import { getAvgRating, getBestRatedFilm, getLongestFilmDuration, getShortestDays } from './utilities'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from '@mui/material';
export default function Films() {

    const isSmall = useMediaQuery('(max-width:680px)')
    const cssObject = {
        root: { backgroundColor: "rgba(255, 229, 250, 0.4)", padding: "15px" },
        heading: { text: "rgba(128, 109, 132, 0.95)", fontSize: "30px", fontWeight: 800 },
        form: { display: 'flex', flexDirection: "column" },
        button: { background: "rgba(240, 188, 25, 0.95)", marginTop: "10px", borderRadius: "10px", height: "35px", width: "150px", borderColor: "white", color: "white", cursor: "pointer" },
        grid: {
            display: "grid",
            columnGap: "5px",

            gridTemplateColumns: isSmall ? "auto" : "auto auto",
        },
        input: { height: "35px", width: isSmall ? "55%" : "35%", borderRadius: "10px", padding: "10px", borderColor: "white", color: "white" }
    }
    const [director, setDirectorName] = useState("")
    const [filmsArray, setFilmArray] = useState([])
    const [cardContentArray, setCardContentArray] = useState([])
    const apiFunction = async (e) => {
        e.preventDefault()

        try {
            return await new Promise((reject, resolve) => {
                const payload = {
                    url: "https://app.codescreen.com/api/assessments/films",
                    params: { directorName: director },
                    headers: {
                        'Authorization': 'Bearer ' + "8c5996d5-fb89-46c9-8821-7063cfbc18b1"
                    },
                    method: "GET"
                }
                axios(payload).then((result) => {
                    setCardContentArray([
                        {
                            title: "Best rated film",
                            value: result.data.length > 0 ? getBestRatedFilm(result.data) : "N/A",
                        },
                        {
                            title: "Longest film duration",
                            value: result.data.length > 0 ? getLongestFilmDuration(result.data) : "N/A",
                        },
                        {
                            title: "Average rating",
                            value: result.data.length > 0 ? getAvgRating(result.data) : "0",
                        },
                        {
                            title: "Shortest days between release",
                            value: result.data.length > 0 ? getShortestDays(result.data) : "N/A",
                        }
                    ])
                    setFilmArray(result.data)
                })
            })
        } catch (error) {
            return console.log("error", error)
        }
    }

    return (
        <div style={cssObject.root}>

            <div >
                <p style={cssObject.heading}>Films Analysis Service </p>
                <form id="input-form" style={cssObject.form}>
                    <input style={cssObject.input} type="text" id="input-box" value={director} onChange={(e) => setDirectorName(e.target.value)} placeholder="Enter director name"></input>
                    <input style={cssObject.button} type="submit" value="Submit" onClick={(e) => apiFunction(e)}></input>
                </form>

            </div> 

            <Grid container spacing = {2} style = {{marginTop : "20px"}}>
                {cardContentArray.length > 0 &&
                    cardContentArray.map((singleobject) =>
                        <Grid item xs = {12} sm = {6}>
                            <Card singleobject={singleobject} isSmall={isSmall} />
                        </Grid>
                    )
                }

            </Grid>



        </div>
    )
}
