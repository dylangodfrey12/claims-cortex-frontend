import React from 'react'
import { Image, Modal } from 'react-bootstrap'
import mailSuccess from "../assets/mail-succes.svg";

const SuccessModal = ({successShow,handleCloseSuccess}) => {
  return (
    <Modal show={successShow} onHide={handleCloseSuccess} centered>
    <Modal.Header className='border-0 pb-0' closeButton>
    </Modal.Header>
    <Modal.Body className="text-dark d-flex align-items-center justify-content-center flex-column mb-4">
        <Image src={mailSuccess} />
        <hr className='text-dark' />
        <h2>Sent Email Successfully!</h2>
    </Modal.Body>
   
  </Modal>
  )
}

export default SuccessModal