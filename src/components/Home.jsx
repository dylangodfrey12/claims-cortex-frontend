import React, { useState } from "react";
import { Button, Col, Container, Image, Nav } from "react-bootstrap";
import {toast} from 'react-toastify';
import logo from "../assets/logo.png";
import FileUploader from "./FileUploader";
import TinyEditor from "./TextEditor";
import { uploadAdjusterMail, uploadPDF } from "../services/uploads/upload.service";

const Home = ({setSummaryText, setEmailText, currentStep, goToNextStep, setAudio }) => {
  const [selectedOption, setSelectedOption] = useState("upload");
  const [estimatePdf, setEstimatePdf] = useState(null);
  const [propertyPdf, setPropertyPdf] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  


  const handlePdfNext = async () => {
    const toastId = toast.loading("Generating Summary..."); // Show loading toast
    try {
      setLoading(true);
      const formData = new FormData();
      if(selectedOption==="upload") {
        formData.append("estimate_pdf", estimatePdf);
        formData.append("property_pdf", propertyPdf);
      } else {
        formData.append("adjuster_email", content);
      }
      const headers= {
        "Content-Type": "multipart/form-data"
      }
  
      const response = selectedOption==="upload"? await uploadPDF(formData,headers):await uploadAdjusterMail(formData,headers);
      console.log("response",response.data);
      setSummaryText(response.data.summary);
      setEmailText(response.data.email);
      setAudio(response.data.audio_url);
      setLoading(false);
      toast.update(toastId, { render: "Summary Generated Successfully", type: "success", isLoading: false, autoClose: 5000 });
      goToNextStep(); // Call the function to go to the next step
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
      toast.update(toastId, { render: "Error uploading files.", type: "error", isLoading: false, autoClose: 5000 });
    }
  };
  

  return (
    <Container className="my-5 d-flex justify-content-center flex-column align-items-center">
      <Col
        lg={6}
        className="mx-auto text-center mb-3"
        style={{
          borderBottom: "1px solid",
          borderColor: "rgb(255, 255, 255,0.2)",
        }}
      >
        <Image src={logo} />
        <h1 className="mt-5 mb-4">UPLOAD FILES</h1>
      </Col>

      <Nav variant="tabs" className="mb-4 home-nav">
        <Nav.Item>
          <Nav.Link
            active={selectedOption === "upload"}
            onClick={() => handleSelect("upload")}
            className="me-2"
          >
            Upload PDFs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={selectedOption === "response"}
            onClick={() => handleSelect("response")}
          >
            Type Response
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {selectedOption === "upload" ? (
  <>
    <FileUploader
      title="Upload Files of Xactimate Estimate Measurements"
      fileType="application/pdf"
      category="xactimate"
      setFile={setEstimatePdf}
      file={estimatePdf}
    />
    <FileUploader
      title="Upload Files of Property Measurements"
      fileType="application/pdf"
      category="property"
      setFile={setPropertyPdf}
      file={propertyPdf}
    />
  </>
) : (
  <>
      <TinyEditor setSummary={setContent} title="Type response from insurance adjuster" />
  </>
)}

      <Col lg={10} className="mx-auto my-4 justify-content-end align-items-center d-flex">
        {currentStep !== 2 && (
          <Button
            className="step-button border-0 px-4 py-2"
            onClick={handlePdfNext}
            disabled={currentStep === 3 || (selectedOption==="upload"?!estimatePdf || !propertyPdf:!content) || loading}
          >
            <p className="m-0">NEXT STEP</p>
          </Button>
        )}
      </Col>
    </Container>
  );
};

export default Home;
