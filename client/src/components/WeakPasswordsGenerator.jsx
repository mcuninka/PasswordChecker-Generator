import React, { useState, useRef } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";
import * as Constants from "../constants"

const WeakPasswordsGenerator = () => {
    const [numberOfPasswords, setNumberOfPasswords] = useState(1);
    const [passwordLength, setPasswordLength] = useState(Constants.MIN_PASSWORD_LENGTH);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const timer = useRef(null);

    // method to generate passwords based on number of passwords and password length
    // firstly set both error and success message to empty string, so no message is displayed
    // then call backend route to generate password and set either success or error message
    const generatePasswords = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setsuccessMessage("");
        clearTimeout(timer.current);

        axios
            .post("/generateWeakPasswords", {
                numberOfPasswords: numberOfPasswords,
                passwordLength: passwordLength,
            })
            .then((res) => {
                if (res.data.hasOwnProperty("error")) {
                    setErrorMessage(res.data["error"]);

                    // if there is an error message, display it only for 5 seconds
                    timer.current = setTimeout(() => {
                        setErrorMessage([]);
                    }, 5000);
                } else {
                    setsuccessMessage(res.data);
                }
            });
    };

    /**
     * Method to set props numberOfPasswords and passwordLength as user types numbers
     * @param e onChange event 
     */
    const inputChange = (e) => {
        const inputField = e.currentTarget.id;

        switch (inputField) {
            case "numberOfPasswords":
                const input = e.currentTarget.value;

                // If user tries to type minus value, that is converted to positive value
                // and if inserts higher number than maxNumberOfPasswords, it changes to the value of maxNumberOfPasswords
                // the same applies for passwordLength
                if (input < 0) {
                    setNumberOfPasswords(Math.abs(input));
                } else if (input > Constants.NUMBER_OF_WEAK_PASSWORDS) {
                    setNumberOfPasswords(Constants.NUMBER_OF_WEAK_PASSWORDS);
                } else {
                    setNumberOfPasswords(input);
                }
                break;
            case "passwordLength":
                const inputPasswordLength = e.currentTarget.value;
                if (inputPasswordLength < 0) {
                    setPasswordLength(Math.abs(inputPasswordLength));
                } else if (inputPasswordLength > Constants.MAX_PASSWORD_LENGTH) {
                    setPasswordLength(Constants.MAX_PASSWORD_LENGTH);
                } else {
                    setPasswordLength(inputPasswordLength);
                }
                break;
            default:
                break;
        }
    };

    // method to reset props
    const clearInput = (e) => {
        e.preventDefault();
        setPasswordLength(Constants.MIN_PASSWORD_LENGTH);
        setNumberOfPasswords(1);
        setErrorMessage("");
        setsuccessMessage("");
    };

    return (
        <div className="m-3">
            <h2>Weak Password Generator</h2>
            <form onSubmit={generatePasswords}>
                <div className="d-flex justify-content-start align-items-center mt-3">
                    <label htmlFor="numberOfPasswords" className="me-2">
                        # of passwords
                    </label>
                    <input
                        name="numberOfPasswords"
                        id="numberOfPasswords"
                        type="number"
                        min={1}
                        max={Constants.NUMBER_OF_WEAK_PASSWORDS}
                        value={numberOfPasswords}
                        className="form-control me-2"
                        style={{ width: "4.7rem" }}
                        onChange={(e) => inputChange(e)}
                    />
                    <label htmlFor="passwordLength" className="me-2">
                        # of characters
                    </label>
                    <input
                        name="passwordLength"
                        id="passwordLength"
                        type="number"
                        min={1}
                        max={Constants.MAX_PASSWORD_LENGTH}
                        value={passwordLength}
                        className="form-control me-2"
                        style={{ width: "4.5rem" }}
                        onChange={(e) => inputChange(e)}
                    />
                    <button
                        className="btn btn-primary me-2"
                        onClick={(e) => generatePasswords(e)}
                    >
                        Generate Passwords
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
                    <StatusMessage message={errorMessage} alert="danger"/>

                )}
                {successMessage.length > 0 && (
                    <StatusMessage message={successMessage} alert="success"/>
                )}
            </div>
        </div>
    );
};

export default WeakPasswordsGenerator;
