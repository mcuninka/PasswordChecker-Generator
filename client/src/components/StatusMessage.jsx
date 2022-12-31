import React from "react";

const StatusMessage = ({ message, alert }) => {
    const className = `alert alert-${alert} h-25 mb-2 p-2`;
    return (
        <div
            className={className}
            style={
                alert === "danger"
                    ? { background: "#ff8888", color: "black", width: "45rem" }
                    : { width: "45rem" }
            }
        >
            {message}
        </div>
    );
};

export default StatusMessage;
