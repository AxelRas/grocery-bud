import React from "react";

export default function Modal(props) {
  return (
    <div className="error-modal">
      <div className="modal-content">
        <p className="modal-title">{props.title}</p>
        <p className="modal-message">{props.message}</p>
        <div className="modal-btn-div">
          <button onClick={props.okBtn} className="modal-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
