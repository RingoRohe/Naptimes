import React, { useEffect, useState } from 'react';
import Loader from 'libs/loading_overlay/js/loader';

function Users(props) {
    // still for demo
    let [users, setUsers] = useState([]);

    useEffect(() => {
        // get data from firestore
        let ldr = new Loader();
        ldr.show({
            elements: document.querySelector("#usersList")
        });

        const unmountUsersStore = props.firebase
            .firestore()
            .collection("users")
            .onSnapshot(querySnapshot => {
                let newUsers = [];
                querySnapshot.forEach(doc => {
                    newUsers.push({
                        id: doc.id,
                        displayName: doc.data().displayName,
                        email: doc.data().email
                    });
                });
                setUsers(newUsers);
                ldr.hide();
            });

        return () => {
            // component will unmount
            unmountUsersStore();
        };
    }, [props]);

    return (
        <article className="card users" id="usersList">
            <h2>all Users</h2>
            <ul>
                {users.map(user => {
                    return (<li key={user.id}>{user.displayName}</li>);
                })}
            </ul>
        </article>
    );
}

export default Users;
