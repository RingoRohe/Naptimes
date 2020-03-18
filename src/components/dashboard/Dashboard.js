import React, {useState, useEffect} from 'react';
import firebase from '../../firebase/firebase';
import Users from './Users';

const Dashboard = (props) => {
    let [users, setUsers] = useState([]);

    useEffect(() => {
        // component did mount
        // get data from firestore
        const unmountFirestore = firebase.firestore().collection("users").onSnapshot(querySnapshot => {
            let newUsers = [];
            querySnapshot.forEach(doc => {
                newUsers.push({
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email
                });
            });
            setUsers(newUsers);
        });

        return () => {
            // component will unmount
            unmountFirestore();
        }
    }, [])

    return (
        <div className="dashboard">
            <h1>Naps</h1>
            <Users users={users} />
            <button onClick={props.onLogoutClicked}>logout</button>
        </div>
    );
}

export default Dashboard;