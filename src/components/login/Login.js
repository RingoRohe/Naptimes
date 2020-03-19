import React, { useState } from 'react';

const Login = (props) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitLogin = (e) => {
        e.preventDefault();
        props.firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {

            })
            .catch(function (error) {
                // Handle Errors here.
                setErrorMessage(`${error.message}`);
            });
        setEmail('')
        setPassword('')
    }

    const onClickSignUp = () => {
        props.firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            setErrorMessage(`${error.message}`);
        });
    }

    return (
        <div className="login">
            <form onSubmit={onSubmitLogin}>
                <input type="email" placeholder="E-Mail" value={email} onChange={onChangeEmail} />
                <input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                <input type="submit" value="Login"/>
                <input type="button" value="Sign up" onClick={onClickSignUp} />
            </form>
            <p className="error">{errorMessage}</p>
        </div>
    );
}

export default Login;
