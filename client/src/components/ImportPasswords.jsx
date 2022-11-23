import React, { useState } from "react";
import axios from "axios";
import StatusMessage from "./StatusMessage";

const ImportPasswords = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [savedMessage, setSavedMessage] = useState("");

    const checkPasswords = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSavedMessage('');

        const formData = new FormData();
        formData.append("file", selectedFile);

        axios.post("/checkPasswords", formData).then((res) => {
            if (res.data.hasOwnProperty("error")) {
                setErrorMessage(res.data["error"]);

                setTimeout(() => {
                    setErrorMessage([]);
                }, 5000);
            } else {
                setSavedMessage(res.data);
            }
        });
    };

    const changeHandler = (e) => {
        setSelectedFile(e.currentTarget.files[0]);
    };

    return (
        <div className="m-3 w-50">
            <h2>Check Passwords</h2>
            <form>
                <div className="d-flex justify-content-start align-items-center mt-3">
                    <label htmlFor="file" className="me-2">
                        Select File
                    </label>
                    <input
                        name="file"
                        id="file"
                        type="file"
                        className="form-control me-2"
                        style={{ width: "20rem" }}
                        onChange={changeHandler}
                    />
                    <button
                        className="btn btn-success"
                        onClick={(e) => checkPasswords(e)}
                    >
                        Check Passwords
                    </button>
                </div>
            </form>
            <div className="mt-3">
                {errorMessage.length > 0 && (
                    <StatusMessage message={errorMessage} alert='danger'/>
                )}
                {savedMessage.length > 0 && (
                    <StatusMessage message={savedMessage} alert='success'/>
                )}
            </div>
        </div>
    );
};

export default ImportPasswords;
