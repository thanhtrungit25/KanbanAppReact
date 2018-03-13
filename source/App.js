import React, { Component } from "react";
import ReactDOM from "react-dom";

class GroceryList extends Component {
  render() {
    return (
      <ul>
        <GroceryItem quantity="1">Bread</GroceryItem>
        <GroceryItem quantity="6">Eggs</GroceryItem>
        <GroceryItem quantity="2">Milk</GroceryItem>
      </ul>
    );
  }
}

class GroceryItem extends Component {
  render() {
    return (
      <li>
        {this.props.quantity}x {this.props.children}
      </li>
    );
  }
}

ReactDOM.render(<GroceryList />, document.getElementById("root"));
