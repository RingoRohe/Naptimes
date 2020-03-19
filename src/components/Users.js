import React from 'react';

function Users(props) {
    return (
        <div className="users">
            <h2>all Users</h2>
            <ul>
                {props.users.map(user => {
                    return (<li key={user.id}>{user.name}</li>);
                })}
            </ul>
        </div>
    );
}

export default Users;
