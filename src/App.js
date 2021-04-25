import { Component } from "react";
import Items from "./components/Items";
import $ from "jquery";

let i = -1;

function newId() {
  return ++i;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentlyEditing: {},
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
  }

  componentDidUpdate() {
    // console.log(this.state.test);
  }

  addItem(item, itemId) {
    if (this.state.items.includes({ id: itemId, text: item })) {
      alert("Item already on list.");
      document.getElementById("input-box").value = "";
      return;
    } else if (item === "") {
      alert("Item can not be an empty string.");
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
    $(`#${itemId}-edit-btn`).html("Edit");
    let newText = document.getElementById(`${itemId}-edit-input`).value;

    if (newText === "") {
      alert(`Item can't be an empty string.`);
      return;
    }

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
