import React, { useState, useEffect } from 'react';

const ProfileMenu = (props) => {
    let [user, setUser] = useState(null);

    useEffect(() => {
        setUser(props.user);
        console.log(user);
    }, []);
    
    return (
        <div className="profile_menu">
            {(user && user.displayName) ? <span>Hello {user.displayName}</span>:<span>Hello</span>}
            <button onClick={props.onLogoutClicked}>logout</button>
        </div>
    );
}

export default ProfileMenu;