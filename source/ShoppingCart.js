import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import constants from "./constants";

// ShoppingCart DnD Spec
//  "A plain object implementing the drop target specification"
//
// - DropTarget Methods (All optional)
//  - drop: Called when a compatible item is dropped.
//  - hover: Called when an item hovered over the component
//  - canDrop: Use it to specify whether the drop target is able to accept the item.
const ShoppingCartSpec = {
  drop() {
    return { name: "ShoppingCart" };
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

class ShoppingCart extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    console.log("canDrop", canDrop);
    console.log("isOver", isOver);
    console.log("connectDropTarget", connectDropTarget);

    let backgroundColor = "#FFFFFF";
    if (isActive) {
      backgroundColor = "#F7F7BD";
    } else if (canDrop) {
      backgroundColor = "#F7F7F7";
    }

    const style = {
      backgroundColor: backgroundColor
    };
    return connectDropTarget(
      <div className="shopping-cart" style={style}>
        {isActive ? "Hmmm, snack!" : "Drag here to order"}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(
  ShoppingCart
);
