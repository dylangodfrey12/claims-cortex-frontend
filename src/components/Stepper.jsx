import React, { useEffect, useState } from "react";
import Home from "./Home";
import Summary from "./Summary";
import EditMail from "./EditMail";
import { Container } from "react-bootstrap";
import { generateMailfromPDF, generateMailfromText } from "../services/uploads/upload.service";
import { toast } from "react-toastify";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [emailText , setEmailText] = useState("");
  const [voiceSrc, setVoiceSrc] = useState("");
  const [pdfLinks, setPDFLinks] = useState(null);
  const [differences, setDifferences] = useState("");
  const [fullArguments, setFullArguments] = useState("");
  const [organizedArguments, setOrganizedArguments] = useState("");
  const [hasCalledAPI, setHasCalledAPI] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [content, setContent] = useState("");
  const [emailJest, setEmailJest] = useState("");
  const [selectedOption, setSelectedOption] = useState("upload");
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

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      if (currentStep === 1) {
        setHasCalledAPI(false);
      }
      setCurrentStep(currentStep - 1);
      
    }
  };

  useEffect(() => {
    if (currentStep === 1 && !hasCalledAPI) {
      callApiEmail();
    }
    // eslint-disable-next-line
  }, [currentStep, hasCalledAPI]);

  const callApiEmail = async () => {
    const toastId = toast.loading("Generating Email Summary for you");
    try {
      const formData = new FormData();
      setEmailLoading(true);
      let data;
      if (selectedOption === "upload") {
      formData.append("differences", differences);
      formData.append("summary", summaryText);
      formData.append("organized_arguments", organizedArguments);
      formData.append("full_arguments", fullArguments);
      }
      else{
        data={
          "adjuster_email": content,
          "summary":summaryText,
          "email_arguments":organizedArguments,
          "email_jest":emailJest,
          "full_arguments":fullArguments
        }
      }
      
      const headers = {
        "Content-Type": "multipart/form-data"
      };
      const response = selectedOption==="upload"? await generateMailfromPDF(formData,headers):await generateMailfromText(data);
      console.log("response",response.data);
      setEmailText(response.data.email);
      const parsedLinks = parseLinks(response.data.links);
      setPDFLinks(parsedLinks);
      toast.update(toastId, { render: "Email Summary Generated Successfully, You may proceed to next step", type: "success", isLoading: false, autoClose: 8000 });
      setEmailLoading(false);
      setHasCalledAPI(true);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.update(toastId, { render: "Error generating summary. Try again later", type: "error", isLoading: false, autoClose: 5000 });
      setEmailLoading(false);
    }
  };
  const steps = [
    {
      label: "Upload Files",
      content: <Home selectedOption={selectedOption} setSelectedOption={setSelectedOption} setEmailJest={setEmailJest} content={content} setContent={setContent} setDifferences={setDifferences} setFullArguments={setFullArguments} setOrganizedArguments={setOrganizedArguments} setPDFLinks={setPDFLinks} setAudio={setVoiceSrc} setEmailText={setEmailText} setSummaryText={setSummaryText} currentStep={currentStep} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />,
      subheading: "Upload estimate and property measurements files",
    },
    {
      label: "Step 2",
      content: <Summary emailLoading={emailLoading} voiceSrc={voiceSrc} text={summaryText} currentStep={currentStep} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep}/>,
      subheading: "Upload estimate and property measurements files",
    },
    {
      label: "Step 3",
      content: <EditMail PDFLinks={pdfLinks} text={emailText} currentStep={currentStep} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />,
      subheading: "Upload estimate and property measurements files",
    },
  ];

  return (
    <div className="stepper">
      <div className="stepper-header">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`stepper-step ${
              index === currentStep
                ? index === 2
                  ? "active last":index === 1?"active second": "active": currentStep>index?"first":"" 
            }`}
          >
            <div className="d-flex justify-content-lg-center justify-content-start">
              <div className={`stepper-step-number mx-2 fw-bold`}>
                {index < currentStep ? "✓" : index + 1}
              </div>
              <div className="stepper-step-label my-auto">
                <div className="label">{step.label}</div>
                <div className="subheading">{step.subheading}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="stepper-content">{steps[currentStep].content}</div>
      <div className="stepper-footer">
        {/* <button onClick={goToPreviousStep} disabled={currentStep === 0}>
          Previous
        </button>
        <button
          onClick={goToNextStep}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button> */}
        <Container className="mx-auto">
          {/* <Col lg={10} className="mx-auto my-4 justify-content-between align-items-center d-flex">
          <Button
              className="step-button border-0 px-4 py-2"
              onClick={goToPreviousStep} disabled={currentStep === 0}
              style={{marginTop:currentStep===2?'-180px':"0px"}}
            >
              <p className="m-0" s>
                PREVIOUS STEP
              </p>
            </Button>
            {
                currentStep!==2 && (
                    <Button
                    className="step-button border-0 px-4 py-2"
                    onClick={goToNextStep}
                    disabled={currentStep === steps.length - 1}
                  >
                    <p className="m-0" s>
                      NEXT STEP
                    </p>
                  </Button>
                )
            }
           
          </Col> */}
        </Container>
      </div>
    </div>
  );
};

export default Stepper;
