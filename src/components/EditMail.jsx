import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import logo from "../assets/logo-2.png";
import pdfIcon from "../assets/pdf-icon.png";
import Modal from "react-bootstrap/Modal";
import TinyEditor from "./TextEditor";
import SuccessModal from "./SuccessModal";
import { toast } from "react-toastify";
// import samplepdf from "../assets/download.pdf";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { sendMail } from "../services/mail/mail.service";

const EditMail = ({
  text,
  currentStep,
  goToNextStep,
  goToPreviousStep,
  PDFLinks,
}) => {
  // const pdfFiles = [
  //   {
  //     name: "File1.pdf",
  //     pdf: samplepdf,
  //   },
  //   {
  //     name: "File2.pdf",
  //     pdf: samplepdf,
  //   },
  //   {
  //     name: "File3.pdf",
  //     pdf: samplepdf,
  //   }
  // ];

  const [show, setShow] = useState(false);
  const [successShow, setsuccessShow] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState(text || "");
  const [pdfModalShow, setPdfModalShow] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  console.log("pdf links", PDFLinks);

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
  };

  const handleSend = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email address. Please enter a valid email.");
      return;
    }

    const toastId = toast.loading("Sending email..."); // Show loading toast

    const emailData = {
      to_email: email,
      subject: subject,
      message: content,
      pdf_links: PDFLinks.flatMap((component) =>
        component.Documents.map((pdf) => pdf.Link).filter((link) => link)
      ).slice(0, 2),
    };

    try {
      const response = await sendMail(emailData);
      console.log("Email sent successfully!", response.data);
      toast.update(toastId, {
        render: "Email sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      handleShowSuccess();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.update(toastId, {
        render: "Failed to send email.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const formatText = (text) => {
    return text?.replace(/\n/g, "<br>");
  };

  // const handlePdfClick = (pdf) => {
  //   setSelectedPdf(pdf);
  //   setPdfModalShow(true);
  // };

  const handlePdfModalClose = () => {
    setPdfModalShow(false);
    setSelectedPdf(null);
  };

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + '...';
    }
    return text;
  };

  const handlePdfDownload = (pdf) => {
    // Open the PDF in a new tab
    const link = document.createElement("a");
    link.href = pdf.Link;
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="my-5 d-flex justify-content-center flex-column align-items-center">
      <Col lg={6} className="mx-auto text-center mb-3">
        <Image src={logo} />
      </Col>
      <TinyEditor
        setSummary={setContent}
        height={700}
        value={formatText(text)}
      />
      <Col lg={10} className="mt-2">
        <div className="align-self-start">
          <h4>Sources</h4>
          <hr />
        </div>
        <Col sm={12} md={12} lg={12} className="my-3">
          <div className="bg-white p-5 rounded">
            <Row>
              {PDFLinks.map((component, compIndex) => (
                <React.Fragment key={compIndex}>
                  {component.Documents.map((pdf, index) => (
                    <>
                      {pdf.Link && (
                        <Col
                          lg={2}
                          md={4}
                          xs={12}
                          className="text-dark d-flex flex-column align-items-center justify-content-center uploads m-2 rounded border pdf-container py-0 py-lg-3"
                          key={index}
                        >
                          <div className="m-auto text-center position-relative">
                            <Image
                              src={pdfIcon}
                              width={30}
                              className="pdf-image m-auto mt-2"
                            />
                            <p
                              className="text-dark mt-3 pdf-image"
                              style={{ fontSize: "15px" }}
                            >
                              {truncateText(
                                component?.Component!=="undefined"?component?.Component:"Source pdf for adjuster's claim",
                                25
                              )}
                            </p>
                            <div className="pdf-actions d-flex">
                              <Button
                                className="pdf-download-btn border-0 bg-transparent"
                                onClick={() => handlePdfDownload(pdf)}
                              >
                                <svg
                                  width="30"
                                  height="30"
                                  fill="#ffffff"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M22.158 8.883c-.739-.469-1.698-.787-2.747-.916-.311-1.833-1.135-3.4-2.403-4.56C15.663 2.178 13.885 1.5 12 1.5c-1.657 0-3.188.52-4.424 1.5a7.017 7.017 0 0 0-2.123 2.832c-1.437.203-2.671.685-3.595 1.406C.642 8.195 0 9.542 0 11.138 0 14.296 2.621 16.5 6.375 16.5h4.875V9.75h1.5v6.75h5.813c3.405 0 5.437-1.605 5.437-4.294 0-1.408-.637-2.558-1.842-3.323Z"></path>
                                  <path d="M11.25 19.66 9 17.39l-1.06 1.08L12 22.5l4.061-4.031-1.06-1.078-2.25 2.27V16.5h-1.5v3.16Z"></path>
                                </svg>
                              </Button>
                              {/* <Button className="pdf-download-btn border-0 bg-transparent" onClick={() => handlePdfClick(pdf)}>
                                <svg width="30" height="30" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                                  <path d="M18.507 6.618C16.457 5.213 14.264 4.5 11.99 4.5c-2.048 0-4.045.61-5.934 1.804C4.149 7.51 2.28 9.704.75 12c1.238 2.063 2.933 4.183 4.697 5.4 2.024 1.393 4.225 2.1 6.542 2.1 2.297 0 4.493-.706 6.53-2.1 1.792-1.228 3.499-3.346 4.731-5.4-1.237-2.036-2.948-4.151-4.743-5.382ZM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"></path>
                                </svg>
                              </Button> */}
                            </div>
                          </div>
                        </Col>
                      )}
                    </>
                  ))}
                </React.Fragment>
              ))}
            </Row>
          </div>
        </Col>
      </Col>
      <Col
        lg={10}
        className="mx-auto my-4 justify-content-between align-items-center d-flex"
      >
        <Button
          className="step-button border-0 px-4 py-2"
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
        >
          <p className="m-0">PREVIOUS STEP</p>
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
            className="bg-transparent py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="mt-3">Subject</p>
          <Form.Control
            type="text"
            placeholder="Email subject"
            className="bg-transparent py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-transparent py-2 px-4"
            style={{
              color: "#5b2ae0",
              borderColor: "#5b2ae0",
              lineHeight: "20px",
            }}
            onClick={handleClose}
          >
            <p className="m-0">No, Cancel</p>
          </Button>
          <Button
            className="step-button border-0 px-4 py-2"
            disabled={!email || !subject}
            onClick={handleSend}
          >
            <p className="m-0">Yes Confirm</p>
          </Button>
        </Modal.Footer>
      </Modal>
      <SuccessModal
        successShow={successShow}
        handleCloseSuccess={handleCloseSuccess}
        handleShowSuccess={handleShowSuccess}
      />
      <Modal
        size="lg"
        show={pdfModalShow}
        onHide={handlePdfModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">PDF Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          {selectedPdf && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={selectedPdf?.Link} />
            </Worker>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-transparent py-2 px-4"
            style={{
              color: "#5b2ae0",
              borderColor: "#5b2ae0",
              lineHeight: "20px",
            }}
            onClick={handlePdfModalClose}
          >
            <p className="m-0">Close</p>
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditMail;
