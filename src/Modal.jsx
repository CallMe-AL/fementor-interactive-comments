import React from 'react'

const Modal = ({ state, setModalState, delObj, deleteComment, setDelObj }) => {

  const closeModal = () => {
    setModalState(false);
    setDelObj({});
  }

  return (
    <div className={state ? 'modal visible flex' : 'modal'}>
      <div className="modal-container">
        <h1>Delete Comment</h1>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className="modal-btn-wrap flex">
          <button className="modal-btn cancel-btn" onClick={closeModal}>No, Cancel</button>
          <button className="modal-btn confirm-btn" onClick={() => deleteComment(delObj)}>Yes, Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Modal