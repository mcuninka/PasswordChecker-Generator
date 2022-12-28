import React, { useState, useRef } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState(12);
    const [errorMessage, setErrorMessage] = useState("");
    const [randomPassword, setRandomPassword] = useState("");
    const [copyStatus, setCopyStatus] = useState("");
    const maxPasswordLength = 50;
    const timer = useRef(null);

    // method to generate password based on the password length from user's input
    const generatePassword = async (e) => {
        e.preventDefault();

        // set both error message and random password to an empty string so no message is displayed
        // before the backend is called
        setErrorMessage("");
        setRandomPassword("");
        clearTimeout(timer.current);

        // call backend to generate password and set the randomPassword prop to that password
        axios
            .post("/generateStrongPassword", { passwordLength: passwordLength })
            .then((res) => {
                setErrorMessage("");
                setRandomPassword("");
                setCopyStatus("");
                if (res.data.hasOwnProperty("error")) {
                    setErrorMessage(res.data["error"]);

                    // if there is an error message, display it only for 5 seconds
                    timer.current = setTimeout(() => {
                        setErrorMessage([]);
                    }, 5000);
                } else {
                    setRandomPassword(res.data);
                }
            });
    };

    /**
     * Method to set prop setPasswordLength as user types numbers
     * @param e onChange event 
     */
    const inputChange = (e) => {
        const input = e.currentTarget.value;
        console.log("rendered")

        // If user tries to type minus value, that is converted to positive value
        // and if inserts higher number than maxPasswordLength, it changes to the value of maxPasswordLength
        if (input < 0) {
            setPasswordLength(Math.abs(input));
        } else if (input > maxPasswordLength) {
            setPasswordLength(maxPasswordLength);
        } else {
            setPasswordLength(input);
        }
    }

    // method to reset props
    const clearInput = (e) => {
        e.preventDefault();
        setPasswordLength(12);
        setErrorMessage("");
        setRandomPassword("");
        setCopyStatus("");
    };

    return (
        <div className="m-3 w-50">
            <h2>Password Generator</h2>
            <form onSubmit={generatePassword}>
                <div className="d-flex justify-content-start align-items-center mt-3">
                    <label htmlFor="passwordLength" className="me-2">
                        # of characters
                    </label>
                    <input
                        name="passwordLength"
                        id="passwordLength"
                        type="number"
                        min={12}
                        max={50}
                        value={passwordLength}
                        className="form-control me-2"
                        style={{ width: "4.5rem" }}
                        onChange={(e) =>
                            inputChange(e)
                        }
                    />
                    <button
                        className="btn btn-primary me-2"
                        onClick={(e) => generatePassword(e)}
                    >
                        Generate Password
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) => clearInput(e)}
                    >
                        Reset
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {errorMessage.length > 0 && (
                    <StatusMessage message={errorMessage} alert='danger'/>

                )}
                {randomPassword.length > 0 && (
                    <div
                        className="alert alert-success h-25 w-75 mb-2 p-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigator.clipboard.writeText(randomPassword);
                            setCopyStatus("Copied to clipboard");
                        }}
                        title="Click to copy to clipboard"
                    >
                        <div className="d-flex justify-content-between">
                            <span>Password: <b>{randomPassword}</b></span>
                            {copyStatus.length > 0 && <span>{copyStatus}</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordGenerator;
