import { Component } from "react";
import Items from './components/Items';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }

    this.addItem = this.addItem.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state.items);
  }

  addItem(item) {
    if (this.state.items.includes(item)) {
      alert('Item already on list.');
      return;
    } else if (item === '') {
      alert('Item can not be an empty string.');
      return;
    }

    this.setState({
      items: [...this.state.items, item]
    });
    document.getElementById('input-box').value = '';
  }

  render() {
    return (
      <div className="App">
        <h1>Grocery List</h1>
        <div className="inputs">
          <input id="input-box" type='text' placeholder='Item to add'></input>
          <div onClick={() => this.addItem(document.getElementById('input-box').value)} id="button">+</div>
        </div>

        <Items data={this.state.items} />
      </div>
    );
  }
}

export default App;
