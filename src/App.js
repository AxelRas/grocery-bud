import { Component } from "react";
import Items from './components/Items';
import $ from 'jquery';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentlyEditing: {}
    }

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
  }

  componentDidUpdate() {
    // console.log(this.state.test);
  }


  addItem(item) {
    if (this.state.items.includes(item)) {
      alert('Item already on list.');
      document.getElementById('input-box').value = '';
      return;
    } else if (item === '') {
      alert('Item can not be an empty string.');
      return;
    }

    this.setState({
      items: [...this.state.items, item],
      currentlyEditing: { ...this.state.currentlyEditing, [item]: false }
    });
    document.getElementById('input-box').value = '';
  }

  removeItem(itemId) {
    this.setState({
      items: this.state.items.filter(item => item !== itemId),
      currentlyEditing: { ...this.state.currentlyEditing, itemId: undefined }
    });
  }

  confirmEdit(itemId) {
    let newItem = document.getElementById(`${itemId}-edit-input`).value;
    if (this.state.items.includes(newItem)) {
      alert('Item already on list');
      return;
    }

    $(`#${itemId}-edit-input`).remove();
    $(`<p>${newItem}</p>`).insertBefore(`#${itemId} .item-actions`);

    let newItemsList = [...this.state.items].filter(item => item !== itemId);
    newItemsList.push(newItem);

    let newCurrentlyEditing = { ...this.state.currentlyEditing }
    delete newCurrentlyEditing[itemId];
    newCurrentlyEditing[newItem] = false
    this.setState({
      items: newItemsList,
      currentlyEditing: newCurrentlyEditing
    })

  }

  editItem(itemId) {
    // FIX ID, NO SPACES ALLOWED
    if (this.state.currentlyEditing[itemId] === false) {

      this.setState({
        currentlyEditing: { ...this.state.currentlyEditing, [itemId]: true }
      });

      $(`#${itemId} p`).remove();

      $(`<input class="edit-input" id="${itemId}-edit-input" type="text" value="${itemId}"></input>`).insertBefore(`#${itemId} .item-actions`);

      $(`#${itemId}-edit-input`).css({
        "font-family": "'Josefin Sans'",
        "font-weight": "300",
        "font-size": "1.2em",
        "background-color": "rgba(255, 255, 255, 0.2)",
        "border": "none",
        "margin": "0",
        "padding": "0",
        "width": "200px"
      });

      document.getElementById(`${itemId}-edit-input`).focus();

      $(`#${itemId}-edit-btn`).html('Confirm');
    } else {
      this.confirmEdit(itemId);
    }


  }

  render() {
    return (
      <div className="App">
        <h1>Grocery List</h1>
        <div className="inputs">
          <input id="input-box" type='text' placeholder='Item to add'></input>
          <div onClick={() => this.addItem(document.getElementById('input-box').value)} id="button">+</div>
        </div>

        <Items editItem={this.editItem} removeItem={this.removeItem} data={this.state.items} />
        <button id="clear-btn" onClick={() => this.setState({ items: [] })}>Clear List</button>
      </div>
    );
  }
}

export default App;
