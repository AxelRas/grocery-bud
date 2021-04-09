import React, { Component } from 'react';
// import $ from 'jquery';

export default class Items extends Component {

  render() {
    return (
      <div className="item-container">
        {this.props.data.map(item => (
          <div id={item} key={item} className="item">
            <p>{item}</p>
            <div className="item-actions">
              <button id={`${item}-edit-btn`} onClick={() => this.props.editItem(item)}>Edit</button>
              <button onClick={() => this.props.removeItem(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
