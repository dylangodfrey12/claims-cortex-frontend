import React, { useState, useRef } from "react";
import { Button, Col, Container, Image, Spinner } from "react-bootstrap";
import logo from "../assets/logo-2.png";
import volume from "../assets/volume.png";
import stop from "../assets/stop.png";

const Summary = ({ emailLoading,voiceSrc, text, currentStep, goToNextStep, goToPreviousStep }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);
    

    const formatText = (text) => {
        return text?.replace(/\n/g, "<br>");
    };

    const playAudio = () => {
        if (voiceSrc && !isPlaying) {
            setIsLoading(true);
            const audio = new Audio(voiceSrc);
            audioRef.current = audio;
            audio.play();
            audio.onplaying = () => {
                setIsLoading(false);
                setIsPlaying(true);
            };
            audio.onended = () => setIsPlaying(false);
        } else if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const stopAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handlePreviousStep = () => {
        stopAudio();
        goToPreviousStep();
    };

    const handleNextStep = () => {
        stopAudio();
        goToNextStep();
    };

    return (
        <Container className="my-5 d-flex justify-content-center flex-column align-items-center">
            <Col lg={6} className="mx-auto text-center mb-3">
                <Image src={logo} />
            </Col>
            <Col lg={10} className="my-3 summary-column py-5 rounded">
                <Col lg={10} className="mx-auto my-3">
                    <div className="d-flex align-items-center justify-content-between border rounded p-2">
                        <p className="text-center m-0 fw-bold">SUMMARY OF YOUR ARGUMENT</p>
                        <Button className="bg-transparent border-0 p-1 delete-btn" onClick={playAudio} disabled={isLoading}>
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                <Image src={isPlaying ? stop : volume} width={25} />
                            )}
                        </Button>
                    </div>
                </Col>

                <Col
                    lg={10}
                    className="text-dark mx-auto p-3 rounded bg-white"
                    style={{ height: "500px", overflow: "auto" }}
                >
                    <div dangerouslySetInnerHTML={{ __html: formatText(text) }} />
                </Col>
            </Col>
            <Col lg={10} className="mx-auto my-4 justify-content-between align-items-center d-flex">
                <Button
                    className="step-button border-0 px-4 py-2"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                    style={{ marginTop: currentStep === 2 ? '-180px' : "0px" }}
                >
                    <p className="m-0">
                        PREVIOUS STEP
                    </p>
                </Button>
                {currentStep !== 2 && (
                    <Button
                        className="step-button border-0 px-4 py-2"
                        onClick={handleNextStep}
                        disabled={emailLoading}
                    >
                        <p className="m-0">
                            NEXT STEP
                        </p>
                    </Button>
                )}
            </Col>
        </Container>
    );
};

export default Summary;
