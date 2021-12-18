import React from 'react'
import { Link, } from "react-router-dom"
import Table from 'react-bootstrap/Table'

const Userlist = ({ users }) => {
    return(
      
    <div>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
      <th></th>
      <th><b>blogs created</b></th>
      </tr>
      </thead>
        <tbody >
      
        {users.map(user => 
          <tr key={user.id} >
            <td>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            
            <td class="badge bg-primary rounded-pill">
            {user.blogs.length}
            </td>
            </tr>
            
            )}
            </tbody>
        </Table>
      </div>
      
        
    )}
export default Userlist