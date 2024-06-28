import React, { useState } from "react";
import { Button, Col, Container, Image, Nav } from "react-bootstrap";
import { toast } from 'react-toastify';
import logo from "../assets/logo.png";
import FileUploader from "./FileUploader";
import TinyEditor from "./TextEditor";
import { uploadAdjusterMail, uploadPDF } from "../services/uploads/upload.service";

const parseLinks = (linksStr) => {
  const lines = linksStr.trim().split('\n');

  const parsedData = [];
  let currentComponent = null;
  let currentDocs = [];

  const componentPattern = /^Component:\s*-\s*(.*)$/;
  const metadataPattern = /Metadata: \{'Argument Name': '(.+)', 'Link': '(.*)?'\}/;

  lines.forEach(line => {
    const componentMatch = line.match(componentPattern);
    const metadataMatch = line.match(metadataPattern);

    if (componentMatch) {
      if (currentComponent) {
        parsedData.push({
          Component: currentComponent,
          Documents: currentDocs,
        });
        currentDocs = [];
      }
      currentComponent = componentMatch[1];
    } else if (metadataMatch) {
      const doc = {
        'Argument Name': metadataMatch[1],
        'Link': metadataMatch[2] || '',
      };
      currentDocs.push(doc);
    }
  });

  if (currentComponent) {
    parsedData.push({
      Component: currentComponent,
      Documents: currentDocs,
    });
  }

  return parsedData;
};

// Sample data to test the function
const linksStr = `
Component: -
Documents:
Metadata: {'Argument Name': 'Mechanical Damage Roof (denial).txt'}
---
`;

const parsedLinks = parseLinks(linksStr);
console.log(parsedLinks);


const Home = ({ setSummaryText, setEmailText,setPDFLinks, currentStep, goToNextStep, setAudio }) => {
  const [selectedOption, setSelectedOption] = useState("upload");
  const [estimatePdf, setEstimatePdf] = useState(null);
  const [propertyPdf, setPropertyPdf] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);// State to store parsed links

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePdfNext = async () => {
    const toastId = toast.loading("Generating Summary..."); // Show loading toast
    try {
      setLoading(true);
      const formData = new FormData();
      if (selectedOption === "upload") {
        formData.append("estimate_pdf", estimatePdf);
        formData.append("property_pdf", propertyPdf);
      } else {
        formData.append("adjuster_email", content);
      }
      const headers = {
        "Content-Type": "multipart/form-data"
      };

      const response = selectedOption === "upload" ? await uploadPDF(formData, headers) : await uploadAdjusterMail(formData, headers);
      console.log("response", response.data);
      setSummaryText(response.data.summary);
      setEmailText(response.data.email);
      setAudio(response.data.audio_url);
      
      // Parse and store the links
      const parsedLinks = parseLinks(response.data.links);
      console.log("parsed Links",parsedLinks);
      setPDFLinks(parsedLinks);
      setLoading(false);
      toast.update(toastId, { render: "Summary Generated Successfully", type: "success", isLoading: false, autoClose: 5000 });
      goToNextStep(); // Call the function to go to the next step
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
      toast.update(toastId, { render: "Error generating summary. Try again later", type: "error", isLoading: false, autoClose: 5000 });
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
            Adjuster's Email
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
            disabled={currentStep === 3 || (selectedOption === "upload" ? !estimatePdf || !propertyPdf : !content) || loading}
          >
            <p className="m-0">NEXT STEP</p>
          </Button>
        )}
      </Col>
    </Container>
  );
};

export default Home;
