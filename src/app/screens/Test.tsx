// @ts-nocheck
import { Margin } from "@mui/icons-material";
import React,  { Component } from "react";

class Test extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        color: "red",
        brand: "Ford",
        model: "Mustang",
        year: 1964
    };
}
changeColor = () => {
    this.setState({
        color: "blue",
        brand: "Tesla", 
        model: "Model S", 
        year: 2027});
}

componentDidMount() {
    console.log("componentDidMount");
    // runs after first render => retrieve data , backend dan data o;osh uchun, test.tx run bolgan bu ham ishlaydi 
}

componentWillUnmount () {
    console.log("componentWillMount");
    // runs before component unmount
}


componentDidUpdate() {
    console.log("componentDidUpdate");
    
    
}

render() {
    return (
        <div>
        <h1>My car is {this.state.brand}</h1>
        <p>
        Color: {this.state.color} - Model: {this.state.model} from {this. state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>ChangeDetail</ button>
        </div>
        );
    }
}

export default Test