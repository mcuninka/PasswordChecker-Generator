import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import PasswordChecker from "./components/PasswordChecker";
import PasswordGenerator from "./components/PasswordGenerator";
import "./App.css";
import WeakPasswordsGenerator from "./components/WeakPasswordsGenerator";
import ImportPasswords from "./components/ImportPasswords";

const App = () => {
    return (
        <div>
            <div className="main-container">
                <PasswordChecker />
                <PasswordGenerator />
                <WeakPasswordsGenerator />
                <ImportPasswords />
            </div>
        </div>
    );
};

export default App;
