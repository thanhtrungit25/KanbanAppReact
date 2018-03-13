import React, { Component } from "react";
import List from "./List";
import PropTypes from "prop-types";

class KanbanBoard extends Component {
  render() {
    return (
      <div className="app">
        <List
          /* asdf */
          id="todo"
          title="To Do" // asdf
          cards={this.props.cards.filter(card => card.status === "todo")}
        />
        <List
          id="in-progress"
          title="In Progress"
          cards={this.props.cards.filter(card => card.status === "in-progress")}
        />
        <List
          id="done"
          title="Done"
          cards={this.props.cards.filter(card => card.status === "done")}
        />
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

export default KanbanBoard;
