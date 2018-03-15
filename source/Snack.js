import React, { Component } from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import constants from "./constants";

// snack Drop'nDrop spec
// - Required: beginDrag
// - Optional: endDrag
// - Optional: canDrag
// - Optional: isDragging
let snackSpec = {
  beginDrag(props) {
    console.log("beginDrag");
    return {
      name: props.name
    };
  },
  endDrag(props, monitor) {
    console.log("endDrag");
    console.log("monitor", monitor);
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log(dragItem, dropResult);

    if (dropResult) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
    }
  }
};

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class Snack extends Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    const style = {
      opacity: opacity
    };

    return connectDragSource(
      <div className="snack" style={style}>
        {name}
      </div>
    );
  }
}

Snack.propTypes = {
  name: PropTypes.string.isRequired
};

export default DragSource(constants.SNACK, snackSpec, collect)(Snack);
