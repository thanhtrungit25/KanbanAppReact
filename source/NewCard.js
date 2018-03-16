import React, { Component } from "react";
import CardForm from "./CardForm";

class NewCard extends Component {
  componentWillMount() {
    this.setState({
      id: Date.now(),
      title: "",
      description: "",
      status: "todo",
      color: "#c9c9c9",
      tasks: []
    });
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit on new card");
    console.log("card draft data need to save", this.state);
    // [Todo]
    this.props.cardCallbacks.addCard(this.state);
    this.props.history.pushState(null, "/");
  }

  handleClose(e) {
    console.log("handleClose on NewCard");
    this.props.history.pushState(null, "/");
  }

  render() {
    console.log("state default card draf on new card", this.state);
    console.log("props on new card", this.props);
    return (
      <CardForm
        draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)}
      />
    );
  }
}

export default NewCard;
