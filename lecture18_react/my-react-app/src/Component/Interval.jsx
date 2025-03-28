import React, { Component } from 'react';

export class Interval extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Interval Component</h1>
                <p>Name: {this.props.name}</p>
                <p>Age: {this.props.age}</p>
            </div>
        );
    }
}

export default Interval;
