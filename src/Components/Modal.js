const Modal = ({children, toggle, title, onClose}) => {
  return (
    <div>
      {
        toggle && <div className="modal">
          <div className="content">
            <div 
              className="close-button-container"
              onClick={onClose}
            > 
              <button className="close-button">x</button>
            </div>
            <h4>{title}</h4>
            {children}
          </div>
        </div>
      }
    </div>
  )
}

export default Modal