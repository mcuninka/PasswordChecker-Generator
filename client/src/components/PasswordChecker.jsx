import React, { useState, useRef } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";

const PasswordChecker = () => {
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const [validPasswordMessage, setValidPasswordMessage] = useState("");
    const timer = useRef(null);

    // method to check password
    // firstly set errors to an empty array and valid message to an empty string, so no message is displayed
    // then call backend route to check the password and set either valid or error message(s)
    const checkPassword = async (e) => {
        e.preventDefault();
        setErrors([]);
        setValidPasswordMessage("");
        clearTimeout(timer.current);
        
        axios.post("/passwordCheck", { password: passwordRef.current.value }).then((res) => {
            if (typeof res.data === "string") {
                setValidPasswordMessage(res.data);
            } else {
                setErrors(res.data);

                // if there is an error message, display it only for 5 seconds
                timer.current = setTimeout(() => {
                    setErrors([]);
                }, 5000);
            }
        });
    };

    // method to clear input for password and set errors to an empty array and valid message to an empty string
    const clearInput = (e) => {
        e.preventDefault();
        passwordRef.current.value = null;
        setErrors([]);
        setValidPasswordMessage("");
    };

    return (
        <div className="m-3">
            <h2>Password Checker</h2>
            <form onSubmit={checkPassword}>
                <div className="d-flex justify-content-start align-items-center mt-3">
                    <label htmlFor="password" className="me-2">
                        Password
                    </label>
                    <input
                        name="password"
                        id="password"
                        type="text"
                        className="form-control me-2"
                        style={{ width: "15rem" }}
                        placeholder="Enter password"
                        ref={passwordRef}
                    />
                    <button type="submit" className="btn btn-success me-2">
                        Check Password
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => clearInput(e)}
                    >
                        Clear
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {errors.length > 0 &&
                    errors.map((error, index) => (
                        <StatusMessage key={index} message={error} alert='danger'/>
                    ))}

                {validPasswordMessage.length > 0 && (
                    <StatusMessage message={validPasswordMessage} alert='success'/>
                )}
            </div>
        </div>
    );
};

export default PasswordChecker;
