import React from "react";
import { Link } from "react-router-dom";


function Table({ data }) {
  return (
    <table>
      <tbody>
        <tr>
          {/* <th>Full Names</th> */}
          {/* <th>Username</th> */}
          {/* <th>Bio</th> */}
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td style={{ padding: '3px' }}><Link>{item.fullNames}</Link> </td>
            <td style={{ padding: '3px' }}><Link to={`/userProfile/${item.userName}`}> {item.userName}</Link></td>
            {/* <td style={{ padding: '3px' }}>{item.bio}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
