import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="App-header">
            <h1><Link to="/" className="btn App-header--h1-link">Hector's Art</Link></h1>
            <aside className="App-header--right">
                <a className="btn btn-link App-header--link" href="tel:+33384516336">+33 (0)6 85 48 50 12</a><br />
                <a className="btn btn-link App-header--link" href="mailto:sablonspaul@gmail.com">sablonspaul@gmail.com</a>
            </aside>
        </header>
    )
}
