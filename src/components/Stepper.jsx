import React, { useState } from "react";
import Home from "./Home";
import Summary from "./Summary";
import EditMail from "./EditMail";
import { Container } from "react-bootstrap";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [emailText , setEmailText] = useState("");
  const [voiceSrc, setVoiceSrc] = useState("");

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const steps = [
    {
      label: "Upload Files",
      content: <Home setAudio={setVoiceSrc} setEmailText={setEmailText} setSummaryText={setSummaryText} currentStep={currentStep} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />,
      subheading: "Upload estimate and property measurements files",
    },
    {
      label: "Step 2",
      content: <Summary voiceSrc={voiceSrc} text={summaryText} currentStep={currentStep} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep}/>,
      subheading: "Upload estimate and property measurements files",
    },
    {
      label: "Step 3",
      content: <EditMail text={emailText} currentStep={currentStep} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />,
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
