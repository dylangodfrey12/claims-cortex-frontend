import React from "react";
import { Col, Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../assets/logo-text.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        localStorage.setItem("authToken", "sample_token_123");
        navigate("/");
    };

    return (
        <Container className="d-flex align-items-center min-vh-100">
            <Col xs={11} lg={6} className="mx-auto">
                <Image
                    src={logo}
                    className="m-auto d-flex justify-content-center pb-4"
                />
                <div className="text-center my-4">
                    <h2 style={{ fontWeight: "700" }}>Log In</h2>
                    <p>Enter your credentials</p>
                </div>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            className="bg-transparent text-white py-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            className="bg-transparent text-white py-3"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        {/* <div className="d-flex justify-content-between align-items-center">
                        <Form.Check type="checkbox" label="Remember me" className='login-checkbox' />
                        <p>
                            <a href="#" style={{color:"#5B2AE0"}}>Forgot Password? </a>
                        </p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                        <Form.Check type="checkbox" className='login-checkbox'  />
                        <p className='m-0 '>
                        I agree to all the <a href="#" style={{color:"#5B2AE0",textDecoration:"none"}}>Terms </a>and <a href="#" style={{color:"#5B2AE0",textDecoration:"none"}}>Privacy Policy </a>
                        </p>
                        </div> */}
                    </Form.Group>

                    <Button
                        className="w-100 login-btn border-0 py-3 fw-bold my-4 fs-5"
                        variant="primary"
                        type="submit"
                    >
                        Log In
                    </Button>
                </Form>
            </Col>
        </Container>
    );
};

export default Login;
