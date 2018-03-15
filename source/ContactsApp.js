import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import ContactList from "./ContactList";

class ContactsApp extends Component {
  constructor() {
    super();
    this.state = {
      filterText: ""
    };
  }

  handleUserInput(searchTerm) {
    this.setState({ filterText: searchTerm });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
        />
        <ContactList
          contacts={this.props.contacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

ContactsApp.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
};

export default ContactsApp;
