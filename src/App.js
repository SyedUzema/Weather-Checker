import React from 'react';
import Weather from './Weather';
import './App.css';

const App = () => {
    return (
        <div className="container">
            <h1 className="title">Weather Updates</h1>
            <Weather />
        </div>
    );
};

export default App;
