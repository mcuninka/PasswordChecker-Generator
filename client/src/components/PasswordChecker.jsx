import React, { useState } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";

const PasswordChecker = () => {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [validPasswordMessage, setValidPasswordMessage] = useState("");

    // method to check password
    // firstly set errors to an empty array and valid message to an empty string, so no message is displayed
    // then call backend route to check the password and set either valid or error message(s)
    const checkPassword = async (e) => {
        e.preventDefault();
        setErrors([]);
        setValidPasswordMessage("");
        
        axios.post("/passwordCheck", { password: password }).then((res) => {
            if (typeof res.data === "string") {
                setValidPasswordMessage(res.data);
            } else {
                setErrors(res.data);

                // if there is an error message, display it only for 5 seconds
                setTimeout(() => {
                    setErrors([]);
                }, 5000);
            }
        });
    };

    // method to clear input for password and set errors to an empty array and valid message to an empty string
    const clearInput = (e) => {
        e.preventDefault();
        setPassword("");
        setErrors([]);
        setValidPasswordMessage("");
    };

    return (
        <div className="m-3 w-50">
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
                        onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }}
                        value={password}
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
