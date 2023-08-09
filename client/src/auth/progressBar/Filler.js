import React from 'react'

function Filler(props) {
  console.log(props.percentage);
  return (
    <div className='filler' style={{width:`${props.percentage}%`}}/>
  )
}

export default Filler