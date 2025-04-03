'use client'
import styled from "styled-components"
export default function Button({text}){
    const btn1={
        fontSize:"15px",
        color:"white",
        backgroundColor:"green",
        borderRadius:"5px",
        border:"0",
        padding:"5px",
        width:"60px",
        marginRight:"7px"
        
    }


    return(
        <button type="submit" style={btn1}  >{text}</button>
    )
}