import React from "react"


const Users = ({ users, userId, deleteOne })=>{
    return (
      <ul>
        {users.map(user => <li key={user.id} ><a href={`#${user.id}`} className={userId*1 === user.id? 'selected':'' }>{user.name}</a> <button onClick={()=>deleteOne(user)}>x</button></li>)}  
      </ul>
    )
}

export default Users