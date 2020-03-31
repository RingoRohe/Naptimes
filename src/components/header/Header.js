import React from 'react'
import { useHistory } from "react-router-dom";

const Header = () => {
    let history = useHistory();

    const onHeaderClicked = e => {
        history.push("/");
    }

    return (
        <header>
            <h1 onClick={onHeaderClicked}>
                Naptimes{" "}
                <span role="img" aria-label="baby">
                    👶🏻
                </span>
            </h1>
        </header >
    );
    
}

export default Header
