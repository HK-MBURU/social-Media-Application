import React, { useEffect, useState } from "react";
import "./search.css";
import { Search as SearchIcon } from "@mui/icons-material";
import { Users } from "./users";
import Table from "./Table";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `http://localhost:5050/searchUser/?q=${query}`
      );
      setData(res.data);
    };
    if (query.length > 2) fetchUsers();
  }, [query]);

  const keys = ["fullNames", "userName", "bio"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div>
      <div className="search-section">
        <div className="input-section">
          <input
            type="text"
            placeholder="Search ...."
            className="searchb"
            onChange={(e) => setQuery(e.target.value)}
          />
          {<Table data={data} />}
        </div>
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Search;
