import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Login = (props) => {
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            {
                provider: props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
                credentialHelper: "none"
            },
            props.firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '/'
    };

    return (
        <div className="login">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={props.firebase.auth()} />
        </div>
    );
}

export default Login;
