import React from 'react';

function Users(props) {
    return (
        <article className="card users" id="usersList">
            <h2>all Users</h2>
            <ul>
                {props.users.map(user => {
                    return (<li key={user.id}>{user.displayName}</li>);
                })}
            </ul>
        </article>
    );
}

export default Users;
