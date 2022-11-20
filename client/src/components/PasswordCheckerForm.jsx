import React, { useState } from "react";
import axios from "axios";

const PasswordCheckerForm = () => {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [validPasswordMessage, setValidPasswordMessage] = useState("");

    const checkPassword = async (e) => {
        e.preventDefault();
        setErrors([]);
        setValidPasswordMessage("");
        
        axios.post("/passwordCheck", { password: password }).then((res) => {
            if (typeof res.data === "string") {
                setValidPasswordMessage(res.data);
            } else {
                setErrors(res.data);
                setTimeout(() => {
                    setErrors([]);
                }, 5000);
            }
        });
    };

    const clearInput = (e) => {
        e.preventDefault();
        setPassword("");
        setErrors([]);
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
                        <div
                            key={index}
                            className="alert alert-danger h-25 mb-2 p-2"
                            style={{ background: "#ff8888", color: "black" }}
                        >
                            {error}
                        </div>
                    ))}

                {validPasswordMessage.length > 0 && (
                    <div className="alert alert-success h-25 mb-2 p-2">
                        {validPasswordMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordCheckerForm;
