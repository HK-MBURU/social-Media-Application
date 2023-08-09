import React from 'react'
import './progressBar.css'
import Filler from './Filler'


function ProgressBar(props) {
  return (
    <div className='progressBar'>
        <Filler percentage={props.percentage}/>
    </div>
  )
}

export default ProgressBar