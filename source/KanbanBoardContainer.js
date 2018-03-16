import React, { Component } from "react";
import KanbanBoard from "./KanbanBoard";
import "whatwg-fetch";
import "babel-polyfill";
import update from "react-addons-update";
import { throttle } from "./utils";

const API_URL = "http://kanbanapi.pro-react.com/";
const API_HEADERS = {
  "Content-Type": "application/json",
  Authorization: "anythingimpossible"
};

class KanbanBoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
    // Only call updateCardStatus when arguments change
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    // Only call updateCardPosition at max every 500ms (or when arguments change)
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
  }

  componentDidMount() {
    fetch(API_URL + "/cards", { headers: API_HEADERS })
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cards: responseData });
      })
      .catch(error => {
        console.log("Error feching and parsing data", error);
      });
  }

  addTask(cardId, taskName) {
    // Keep a reference to the original state prior to the mutations
    // in case when we need to revert the optimistic changes in the UI
    let prevState = this.state;

    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

    // Create a new task with the given name and a temporary ID
    let newTask = {
      id: Date.now(),
      name: taskName,
      done: false
    };

    // Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          $push: [newTask]
        }
      }
    });
    // set the component state to the mutated object
    this.setState({ cards: nextState });

    // call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response was't OK");
        }
      })
      .then(responseData => {
        console.log("responseData.id", responseData.id);
        newTask.id = responseData.id;
        this.setState({ cards: nextState });
      })
      .catch(error => {
        this.setState(prevState);
      });
  }

  deleteTask(cardId, taskId, taskIndex) {
    let prevState = this.state;
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);

    // Create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    // set the component state to the mutated object
    this.setState({ cards: nextState });

    // call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: "delete",
      headers: API_HEADERS
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response was't OK");
        }
      })
      .catch(error => {
        console.log("Fetch error", error);
        this.setState(prevState);
      });
  }

  toggleTask(cardId, taskId, taskIndex) {
    let prevState = this.state;
    // Find the cardIndex of the cards
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Save the reference to the task's 'done' value
    let newDoneValue;
    // Using the $apply command, change the done value to it opposite
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: done => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    });
    // Set the component state to the mutated object
    this.setState({ cards: nextState });
    // Call the API to toggle to the mutated object
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: "put",
      headers: API_HEADERS,
      body: JSON.stringify({ done: newDoneValue })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response was't OK");
        }
      })
      .catch(error => {
        console.log("Fetch error", error);
        this.setState(prevState);
      });
  }

  updateCardStatus(cardId, listId) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Get the current card
    let card = this.state.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== !listId) {
      // Set the component state to the mutated object
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId }
            }
          }
        })
      );
    }
  }

  updateCardPosition(cardId, afterId) {
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
      // Find the index of the card
      let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
      // Get the current card
      let card = this.state.cards[cardIndex];
      // Find the index of the card the hovering over
      let afterIndex = this.state.cards.findIndex(card => card.id === afterId);
      // Use splice to remove the card and reinsert it a new index
      this.setState(
        update(this.state, {
          cards: {
            $splice: [[cardIndex, 1], [afterIndex, 0, card]]
          }
        })
      );
    }
  }

  persistCardDrag(cardId, status) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    // Get the current card
    let card = this.state.cards[cardIndex];

    fetch(`${API_URL}/cards/${cardId}`, {
      method: "put",
      headers: API_HEADERS,
      body: JSON.stringify({
        status: card.status,
        row_order_position: cardIndex
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch(error => {
        console.log("Fetch error:", error);
        this.setState(
          update(this.state, {
            cards: {
              [cardIndex]: {
                status: { $set: status }
              }
            }
          })
        );
      });
  }

  addCard(card) {
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimictic change in the UI
    let prevState = this.state;

    // Add a temporary ID to the card
    if (card.id === null) {
      card.id = Object.assign({}, card, { id: Date.now() });
    }

    // Create a new object and push the new card to the array of cards
    let nextState = update(this.state.cards, { $push: [card] });

    // Set the component state to the mutated object
    this.setState({ cards: nextState });

    // Call the API to add the card on the server
    fetch(`${API_URL}/cards`, {
      method: "post",
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then(responseData => {
        // Whe the server return the definitive ID
        // used for the new card on the server, update it on React
        card.id = responseData.id;
        this.setState({ cards: nextState });
      })
      .catch(error => {
        this.setState(prevState);
      });
  }

  updateCard(card) {
    let prevState = this.state;

    console.log("this.state.cards", this.state.cards);
    console.log("card", card);
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex(c => c.id === card.id);
    console.log("cardIndex", cardIndex);

    // Using the $set command, we will change the whole card
    let nextState = update(this.state.cards, {
      [cardIndex]: { $set: card }
    });

    console.log("nextState", nextState);

    // set the component state to the mutated object
    this.setState({ cards: nextState });

    // Call the API to update the card on the server
    fetch(`${API_URL}/cards/${card.id}`, {
      method: "put",
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Server response wasn't OK");
        }
      })
      .catch(error => {
        console.log("Fech error", error);
        this.setState(prevState);
      });
  }

  render() {
    let kanbanBoard =
      this.props.children &&
      React.cloneElement(this.props.children, {
        cards: this.state.cards,
        taskCallbacks: {
          toggle: this.toggleTask.bind(this),
          delete: this.deleteTask.bind(this),
          add: this.addTask.bind(this)
        },
        cardCallbacks: {
          addCard: this.addCard.bind(this),
          updateCard: this.updateCard.bind(this),
          updateStatus: this.updateCardStatus,
          updatePosition: this.updateCardPosition,
          persistCardDrag: this.persistCardDrag.bind(this)
        }
      });

    return kanbanBoard;
  }
}

export default KanbanBoardContainer;
