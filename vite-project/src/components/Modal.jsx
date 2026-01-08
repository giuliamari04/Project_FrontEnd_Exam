import "../assets/styles/Modal.css";

function Modal({ message, onClose, onConfirm, showConfirm = false }) {
  return (
    <div className="my-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3 className="text-2xl font-bold">Notification</h3>

        <div>{message}</div>

        {showConfirm && (
          <div className="modal-actions">
            <button className="delete-btn m-4" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
