import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";

import KanbanBoardContainer from "./KanbanBoardContainer";
// import CardForm from "./CardForm";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

import ContactsApp from "./ContactsApp";
import AnimatedShoppingList from "./AnimatedShoppingList";
import Container from "./Container";
import PropTypes from "prop-types";
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

class Greeter extends Component {
  render() {
    return <h1>{this.props.salutation}</h1>;
  }
}
Greeter.propTypes = {
  salutation: PropTypes.string.isRequired
};
Greeter.defaultProps = {
  salutation: "Hello World"
};

let contacts = [
  { name: "Cassio Zen", email: "cassiozen@gmail.com" },
  { name: "Dan Abramov", email: "gaearon@somewhere.com" },
  { name: "Pete Hunt", email: "floydophone@somewhere.com" },
  { name: "Paul O’Shannessy", email: "zpao@somewhere.com" },
  { name: "Ryan Florence", email: "rpflorence@somewhere.com" },
  { name: "Sebastian Markbage", email: "sebmarkbage@here.com" }
];

// <NewCard />,
// <CardForm />,
// <Container />,
// <Search />,
// <KanbanBoardContainer />,
// <AnimatedShoppingList />,
// <Greeter />,
// <ContactsApp contacts={contacts} />,
ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route component={KanbanBoardContainer}>
      <Route path="/" component={KanbanBoard}>
        <Route path="new" component={NewCard} />
        <Route path="edit/:card_id" component={EditCard} />
      </Route>
    </Route>
  </Router>,

  document.getElementById("root")
);
