import React, { Component } from "react";

class CardForm extends Component {
  handleChange(field, e) {
    this.props.handleChange(field, e.target.value);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.handleClose();
  }

  render() {
    return (
      <div>
        <div className="card big" onSubmit={this.props.handleSubmit.bind(this)}>
          <form>
            <input
              type="text"
              value={this.props.draftCard.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
              require={true}
              autoFocus={true}
            />
            <br />
            <textarea
              value={this.props.draftCard.description}
              placeholder="description"
              require={true}
              onChange={this.handleChange.bind(this, "description")}
            />
            <br />
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={this.props.draftCard.status}
              onChange={this.handleChange.bind(this, "status")}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">in-progress</option>
              <option value="done">Done</option>
            </select>
            <br />
            <label htmlFor="color">Color</label>
            <input
              id="color"
              type="color"
              value={this.props.draftCard.color}
              defaultValue="#ff0000"
              onChange={this.handleChange.bind(this, "color")}
            />
            <div className="actions">
              <button type="submit">{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className="overlay" onClick={this.handleClose.bind(this)} />
      </div>
    );
  }
}

export default CardForm;
