import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const users =useLoaderData()
    const [loadedUsers, setLoadedUsers] =useState(users)
    console.log(users)

const handleDelete=_id=>{
    console.log('deleted:', _id)

    fetch(`http://localhost:5000/users/${_id}`, {
        method:'DELETE'
    })
    .then(res =>res.json())
    .then(data =>{
        console.log(data)
        if(data.deletedCount > 0){
            alert('deleted this user successfully')
            const remaining =loadedUsers.filter(loadedUser =>loadedUser._id != _id)
            console.log(remaining)
            setLoadedUsers(remaining);
        }
    })
}

    return (
        <div>
            <h2>User: {loadedUsers.length}</h2>
            <div>
                {
                    loadedUsers.map(user =><p key={user._id}> {user.name}: {user.email}
                    {/* update */}
                    <Link to={`/update/${user._id}`}><button>Update</button></Link>
                    {/* delete button */}
                    <button onClick={()=>handleDelete(user._id)}>x</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;