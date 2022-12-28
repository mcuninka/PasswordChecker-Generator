import React, { useRef, useState } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";

const ImportPasswords = () => {
    const [selectedFile, setSelectedFile] = useState();
    const fileRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [savedMessage, setSavedMessage] = useState("");
    const timer = useRef(null);

    // method to check passwords from provided txt file
    // firstly set both error and saved message to an empty string, so no message is displayed
    // then append file to the form data and call backend route to check passwords
    // and set either saved or error message
    const checkPasswords = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setSavedMessage("");
        clearTimeout(timer.current);

        const formData = new FormData();
        formData.append("file", selectedFile);

        axios.post("/checkPasswords", formData).then((res) => {
            if (res.data.hasOwnProperty("error")) {
                setErrorMessage(res.data["error"]);

                // if there is an error message, display it only for 5 seconds
                timer.current = setTimeout(() => {
                    setErrorMessage([]);
                }, 5000);
            } else {
                setSavedMessage(res.data);
            }
        });
    };

    // method to reset props
    const clearInput = (e) => {
        e.preventDefault();
        fileRef.current.value = null;
        setSelectedFile(null);
        setErrorMessage("");
        setSavedMessage("");
    };

    // method to set file to the selected file prop
    const changeHandler = (e) => {
        e.preventDefault();
        setSelectedFile(e.currentTarget.files[0]);
    };

    return (
        <div className="m-3 w-50">
            <h2>Check Passwords</h2>
            <form>
                <div className="d-flex justify-content-start align-items-center mt-3">
                    <label htmlFor="file" id="file" className="me-2">
                        Select File
                    </label>
                    <input
                        name="file"
                        id="file"
                        type="file"
                        ref={fileRef}
                        className="form-control me-2"
                        style={{ width: "20rem" }}
                        onChange={changeHandler}
                    />
                    <button
                        className="btn btn-success me-2"
                        onClick={(e) => checkPasswords(e)}
                    >
                        Check Passwords
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
                {errorMessage.length > 0 && (
                    <StatusMessage message={errorMessage} alert="danger" />
                )}
                {savedMessage.length > 0 && (
                    <StatusMessage message={savedMessage} alert="success" />
                )}
            </div>
        </div>
    );
};

export default ImportPasswords;
