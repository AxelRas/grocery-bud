import React from "react";
// import $ from 'jquery';

export default function Items(props) {
  return (
    <div className="item-container">
      {props.data.map((item) => (
        <div id={`${item.id}`} key={item.id} className="item">
          <p>{item.text}</p>
          <div className="item-actions">
            <button
              id={`${item.id}-edit-btn`}
              onClick={() => props.editItem(item.text, item.id)}
            >
              Edit
            </button>
            <button onClick={() => props.removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
