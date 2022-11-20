import React, { useState } from "react";
import axios from "axios";

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState(12);
    const [errorMessage, setErrorMessage] = useState("");
    const [randomPassword, setRandomPassword] = useState("");
    const [copyStatus, setCopyStatus] = useState("");

    const generatePassword = async (e) => {
        e.preventDefault();

        axios
            .post("/generatePassword", { passwordLength: passwordLength })
            .then((res) => {
                setErrorMessage("");
                setRandomPassword("");
                setCopyStatus("");
                if (res.data.hasOwnProperty("error")) {
                    setErrorMessage(res.data["error"]);

                    setTimeout(() => {
                        setErrorMessage([]);
                    }, 5000);
                } else {
                    setRandomPassword(res.data);
                }
            });
    };

    const inputChange = (e) => {
        const input = e.currentTarget.value;
        if (input < 0) {
            setPasswordLength(Math.abs(input));
        } else if (input > 50) {
            setPasswordLength(50);
        } else {
            setPasswordLength(input);
        }
    }

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
                        className="btn btn-primary"
                        onClick={(e) => generatePassword(e)}
                    >
                        Generate Password
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {errorMessage.length > 0 && (
                    <div
                        className="alert alert-danger h-25 mb-2 p-2"
                        style={{ background: "#ff8888", color: "black" }}
                    >
                        {errorMessage}
                    </div>
                )}
                {randomPassword.length > 0 && (
                    <div
                        className="alert alert-success h-25 mb-2 p-2"
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
