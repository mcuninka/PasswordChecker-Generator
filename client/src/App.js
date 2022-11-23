import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import PasswordCheckerForm from "./components/PasswordCheckerForm";
import PasswordGenerator from "./components/PasswordGenerator";
import "./App.css";
import WeakPasswordsGenerator from "./components/WeakPasswordsGenerator";
import ImportPasswords from "./components/ImportPasswords";

const App = () => {
    return (
        <div>
            <div className="main-container">
                <PasswordCheckerForm />
                <PasswordGenerator />
                <WeakPasswordsGenerator />
                <ImportPasswords />
            </div>
        </div>
    );
};

export default App;
