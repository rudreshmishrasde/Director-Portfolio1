import React, { useEffect, useState } from 'react'

export default function Card({ singleobject  , isSmall}) {
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")
    useEffect(() => {
        if (singleobject?.value)
            setValue(singleobject?.value)
    }, [singleobject?.value])
    console.log("singleobject?.value", value)
    return (
        <div style={{ display: "flex", flexDirection: "column", background: "white", padding: "20px"  , height : "200px" ,  width : "200px" }}>
            <p style = {{color : "rgba(187, 187, 187, 0.95)"}}>{singleobject?.title}</p>
            <h2>{singleobject?.value ? singleobject?.value : "NA"}</h2>
        </div>

    )
}
