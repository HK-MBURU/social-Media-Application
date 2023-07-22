import React from 'react'
import './search.css'
import { Search as SearchIcon } from "@mui/icons-material";

function Search() {
  return (
    <div>
        <div className="search-section">
            <div className="input-section">
                <input type="text" placeholder='Search ....' className='searchb' />
                <ul>
                  <li className="listItem">John</li>
                  <li className="listItem">Jane</li>
                  <li className="listItem">James</li>
                  <li className="listItem">Mike</li>
                </ul>
            </div>
            <div className="search-icon">
                <SearchIcon/>             

            </div>

        </div>
    </div>
  )
}

export default Search