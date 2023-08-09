import React from "react"
import ProgressBar from "./ProgressBar"

class ProgressBarExample extends React.Component{
    constructor(props){
        super(props)
        this.state={
            percentage:0
        }
    }

    render(){
        return(
            <div>
                <ProgressBar percentage={this.state.percentage}/>
            </div>
        )
    }
}
export default ProgressBarExample