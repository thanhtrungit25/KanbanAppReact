import React, { Component } from "react";
import ReactDOM from "react-dom";
import KanbanBoard from "./KanbanBoard";

let cardsList = [
  {
    id: 1,
    title: "Read the Book",
    description: "I should read the **whole** book",
    color: "#BD8D31",
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code",
    description:
      "Code along with the samples in the book at [github](https://github.com/pro-react)",
    color: "#3A7E28",
    status: "todo",
    tasks: [
      {
        id: 1,
        name: "ContactList Example",
        done: true
      },
      {
        id: 2,
        name: "Kanban Example",
        done: false
      },
      {
        id: 3,
        name: "My own experiments",
        done: false
      }
    ]
  }
];

class Search extends Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log(
      "Submitted values are: ",
      event.target.name.value,
      event.target.email.value
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="formGroup">
          Name: <input type="text" name="name" />
        </div>
        <div className="formGroup">
          Email: <input type="email" name="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  // <Search />,
  <KanbanBoard cards={cardsList} />,
  document.getElementById("root")
);
