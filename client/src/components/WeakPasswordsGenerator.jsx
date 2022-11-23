import React, { useState } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";

const WeakPasswordsGenerator = () => {
    const [numberOfPasswords, setNumberOfPasswords] = useState(1);
    const [passwordLength, setPasswordLength] = useState(12);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setsuccessMessage] = useState("");

    const maxNumberOfPasswords = 1000;
    const maxPasswordLength = 50;

    const generatePasswords = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setsuccessMessage("");

        axios
            .post("/generateWeakPasswords", {
                numberOfPasswords: numberOfPasswords,
                passwordLength: passwordLength,
            })
            .then((res) => {
                if (res.data.hasOwnProperty("error")) {
                    setErrorMessage(res.data["error"]);

                    setTimeout(() => {
                        setErrorMessage([]);
                    }, 5000);
                } else {
                    setsuccessMessage(res.data);
                }
            });
    };

    const inputChange = (e) => {
        const inputField = e.currentTarget.id;

        switch (inputField) {
            case "numberOfPasswords":
                const input = e.currentTarget.value;
                if (input < 0) {
                    setNumberOfPasswords(Math.abs(input));
                } else if (input > maxNumberOfPasswords) {
                    setNumberOfPasswords(maxNumberOfPasswords);
                } else {
                    setNumberOfPasswords(input);
                }
                break;
            case "passwordLength":
                const inputPasswordLength = e.currentTarget.value;
                if (inputPasswordLength < 0) {
                    setPasswordLength(Math.abs(input));
                } else if (inputPasswordLength > maxPasswordLength) {
                    setPasswordLength(maxPasswordLength);
                } else {
                    setPasswordLength(inputPasswordLength);
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="m-3 w-50">
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
                        max={maxNumberOfPasswords}
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
                        max={maxPasswordLength}
                        value={passwordLength}
                        className="form-control me-2"
                        style={{ width: "4.5rem" }}
                        onChange={(e) => inputChange(e)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={(e) => generatePasswords(e)}
                    >
                        Generate Passwords
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
