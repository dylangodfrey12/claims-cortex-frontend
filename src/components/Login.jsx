import React, { useState } from "react";
import { Col, Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo-text-2.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        
        // Basic validation
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        // Check credentials
        if (email === "admin@gmail.com" && password === "admin") {
            localStorage.setItem("authToken", "sample_token_123");
            navigate("/");
        } else {
            toast.error("Invalid credentials.");
        }
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            className="bg-transparent text-white py-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
