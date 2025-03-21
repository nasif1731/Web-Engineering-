import React from 'react';
import './App.css';

function NewTest(props){
    return(
        <div>
            <h2>Name: {props.name}</h2>
            <h3>Age: {props.age}</h3>
        </div>
    );
}

export default NewTest;