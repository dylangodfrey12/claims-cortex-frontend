import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import pdfIcon from "../assets/pdf-icon.png";
import Modal from 'react-bootstrap/Modal';
import TinyEditor from "./TextEditor";
import SuccessModal from "./SuccessModal";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const EditMail = ({text,currentStep,goToNextStep,goToPreviousStep}) => {
  const pdfFiles = [
    {
        name:"File1.pdf"
    },
    {
        name:"File2.pdf"
    },
    {
        name:"File3.pdf"
    }
  ];


const [show, setShow] = useState(false);
const [successShow, setsuccessShow] = useState(false);
const [email, setEmail] = useState("");
const [content, setContent] = useState(text||"");

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const handleCloseSuccess = () => setsuccessShow(false);
const handleShowSuccess = () => {
    setShow(false);
    setsuccessShow(true);
}

const handleSend = () => {
  if (!validateEmail(email)) {
    toast.error("Invalid email address. Please enter a valid email.");
    return;
  }

  const toastId = toast.loading("Sending email..."); // Show loading toast

  const templateParams = {
    to_email: email,
    message: content,
  };

  emailjs.init({
    publicKey: 'kbqxzumK14ttG-Rr5',
  });

  emailjs.send('service_gtmgvjf', 'template_g6rkh89', templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      toast.update(toastId, { render: "Email sent successfully!", type: "success", isLoading: false, autoClose: 5000 });
      handleShowSuccess();
    }, (error) => {
      console.log('FAILED...', error);
      toast.update(toastId, { render: "Failed to send email.", type: "error", isLoading: false, autoClose: 5000 });
    });
}

const formatText = (text) => {
  return text?.replace(/\n/g, "<br>");
};

return (
  <Container className="my-5 d-flex justify-content-center flex-column align-items-center">
    <Col lg={6} className="mx-auto text-center mb-3">
      <Image src={logo} />
    </Col>
    <TinyEditor setSummary={setContent} height={700} value={formatText(text)} />
    <Col lg={10} className="mt-2">
      <div className="align-self-start">
        <h4>Uploaded Files</h4>
        <hr />
      </div>
      <Col sm={12} md={12} lg={12} className="my-3">
        <div className="bg-white p-5 rounded">
          <Row>
          {pdfFiles.map((pdf, index) => (
          <Col lg={2} className="text-dark uploads m-2  rounded border " key={index}>
           
              <div className="m-auto text-center">
                  <Image src={pdfIcon} width={30}  />
                  <p className="mt-2 mb-0">{pdf.name}</p>
              </div>
            
          </Col>
          ))}
          </Row>
      
        </div>
      </Col>
    </Col>
      <Col lg={10} className="mx-auto my-4 justify-content-between align-items-center d-flex">
        <Button
            className="step-button border-0 px-4 py-2"
            onClick={goToPreviousStep} disabled={currentStep === 0}
          >
            <p className="m-0">
              PREVIOUS STEP
            </p>
          </Button>
          <Button className="step-button border-0 px-3 py-2" onClick={handleShow}>
         <p className="m-0">SEND EMAIL</p> 
      </Button>
         
        </Col>
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark">Send Email</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-dark">
          <p>Email Address</p>
          <Form.Control
            type="email"
            placeholder="Receiver’s email address"
            className="bg-transparent  py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
      </Modal.Body>
      <Modal.Footer>
        <Button  className="bg-transparent py-2 px-4" style={{color:"#5b2ae0",borderColor:"#5b2ae0",lineHeight:"20px"}} onClick={handleClose}>
        <p className="m-0">No, Cancel</p> 
        </Button>
        <Button className="step-button border-0 px-4 py-2" disabled={!email} onClick={handleSend}>
         <p className="m-0">Yes Confirm</p> 
      </Button>
      </Modal.Footer>
    </Modal>
    <SuccessModal successShow={successShow} handleCloseSuccess={handleCloseSuccess} handleShowSuccess={handleShowSuccess} />
  </Container>
  
);
};

export default EditMail;
