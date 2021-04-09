import React, { Component } from 'react';
import $ from 'jquery';

export default class Items extends Component {

  render() {
    return (
      <div className="item-container">
        {this.props.data.map(item => (
          <div id={item} key={item} className="item">
            <p>{item}</p>
            <div className="item-actions">
              <button>Edit</button>
              {/* Memory leak on remove function */}
              <button onClick={() => $('#' + item).remove()}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
