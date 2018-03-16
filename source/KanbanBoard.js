import React, { Component } from "react";
import List from "./List";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Link } from "react-router";

class KanbanBoard extends Component {
  render() {
    console.log("KanbanBoard");
    console.log("this.props", this.props);
    let cardModal =
      this.props.children &&
      React.cloneElement(this.props.children, {
        cards: this.props.cards,
        cardCallbacks: this.props.cardCallbacks
      });
    return (
      <div className="app">
        <Link to="/new" className="float-button">
          +
        </Link>

        <List
          /* asdf */
          id="todo"
          title="To Do" // asdf
          cards={this.props.cards.filter(card => card.status === "todo")}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
        />
        <List
          id="in-progress"
          title="In Progress"
          cards={this.props.cards.filter(card => card.status === "in-progress")}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
        />
        <List
          id="done"
          title="Done"
          cards={this.props.cards.filter(card => card.status === "done")}
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
        />

        {cardModal}
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
