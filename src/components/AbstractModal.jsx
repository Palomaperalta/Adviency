import Modal from 'react-modal'

function AbstractModal({
    openModal, 
    closeModal,
    children
}){

return (
    <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlayModal"
    >
        {children}
    </Modal>
)}

export default AbstractModal
