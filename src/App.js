import React, { Component } from "react";
import ReactDOM from "react-dom";
import Items from "./components/Items";
import $ from "jquery";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";

let i = -1;

function newId() {
  return ++i;
}

const errorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Modal
          title={props.title}
          message={props.message}
          okBtn={props.okBtn}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

const backdrop = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
    </React.Fragment>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentlyEditing: {},
      error: "",
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  dismissModal() {
    this.setState({ error: "" });
  }

  addItem(item, itemId) {
    if (item === "") {
      this.setState({
        error: {
          title: "Invalid input",
          message: "Input can not be an empty string",
        },
      });
      return;
    }

    this.setState({
      items: [...this.state.items, { id: itemId, text: item }],
      currentlyEditing: { ...this.state.currentlyEditing, [itemId]: false },
    });
    document.getElementById("input-box").value = "";
  }

  removeItem(idToRemove) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== idToRemove),
      currentlyEditing: { ...this.state.currentlyEditing },
    });
  }

  confirmEdit(itemId) {
    // return;
    let newText = document.getElementById(`${itemId}-edit-input`).value;

    if (newText === "") {
      this.setState({
        error: {
          title: "Invalid input",
          message: "Input can not be an empty string",
        },
      });
      return;
    }

    $(`#${itemId}-edit-btn`).html("Edit");
    $(`#${itemId}-edit-input`).remove();
    $(`<p>${newText}</p>`).insertBefore(`#${itemId} .item-actions`);

    // console.log(document.querySelector(`#0 p`).textContent);
    let newItemsArr = [...this.state.items].filter(
      (item) => item.id !== itemId
    );
    newItemsArr.push({ id: itemId, text: newText });

    this.setState({
      items: newItemsArr,
      currentlyEditing: { ...this.state.currentlyEditing, [itemId]: false },
    });
  }

  editItem(item, itemId) {
    if (!this.state.currentlyEditing[itemId]) {
      this.setState({
        currentlyEditing: { ...this.state.currentlyEditing, [itemId]: true },
      });

      $(`#${itemId} p`).remove();

      $(
        `<input class="edit-input" id="${itemId}-edit-input" type="text" value="${item}"></input>`
      ).insertBefore(`#${itemId} .item-actions`);

      $(`#${itemId}-edit-input`).css({
        "font-family": "'Josefin Sans'",
        "font-weight": "300",
        "font-size": "1.2em",
        "background-color": "rgba(255, 255, 255, 0.2)",
        border: "none",
        margin: "0",
        padding: "0",
        width: "200px",
      });

      document.getElementById(`${itemId}-edit-input`).focus();

      $(`#${itemId}-edit-btn`).html("Confirm");
    } else {
      this.confirmEdit(itemId);
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.error &&
          errorModal({
            title: this.state.error.title,
            message: this.state.error.message,
            okBtn: this.dismissModal,
          })}
        {this.state.error && backdrop()}
        <h1>Grocery List</h1>
        <div className="inputs">
          <input id="input-box" type="text" placeholder="Item to add"></input>
          <div
            onClick={() =>
              this.addItem(
                document.getElementById("input-box").value,
                `item-${newId()}`
              )
            }
            id="button"
          >
            +
          </div>
        </div>

        <Items
          editItem={this.editItem}
          removeItem={this.removeItem}
          data={[...this.state.items].sort(
            (a, b) => a.id.slice(-1) - b.id.slice(-1)
          )}
        />
        <button id="clear-btn" onClick={() => this.setState({ items: [] })}>
          Clear List
        </button>
      </div>
    );
  }
}

export default App;
