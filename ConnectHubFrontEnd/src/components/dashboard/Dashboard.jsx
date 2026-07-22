import { useState } from "react";
import { simulateIncomingCall } from "../../services/callService";
import IncomingCallModal from "../calls/IncomingCallModal";
import ActiveCallModal from "../calls/ActiveCallModal";
import "./Dashboard.css";

export default function Dashboard() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const [incomingCall, setIncomingCall] = useState(null);

    const [activeCall, setActiveCall] = useState(null);

    const [recentCalls, setRecentCalls] = useState([]);

    const handleSimulateCall = async () => {
        if (!phoneNumber.trim()) {
            alert("Enter a phone number.");
            return;
        }

        try {
            const response = await simulateIncomingCall(phoneNumber);

            setIncomingCall(response);

            setRecentCalls((prev) => [response, ...prev]);

            setPhoneNumber("");
        } catch (error) {
            console.error(error);
            alert("Unable to simulate call.");
        }
    };

    const handleCallEnded = (response) => {
        setRecentCalls((prev) =>
            prev.map((call) =>
                call.callId === response.callId
                    ? {
                          ...call,
                          status: response.status,
                          durationSeconds: response.durationSeconds,
                      }
                    : call
            )
        );

        setActiveCall(null);
    };

    return (
        <div className="dashboard">
            <h1>CONNECTHUB</h1>

            <div className="call-card">
                <h2>📞 Simulate Incoming Call</h2>

                <input
                    type="text"
                    placeholder="Enter phone number..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <button onClick={handleSimulateCall}>
                    Simulate Call
                </button>
            </div>

            <div className="history-card">
                <h2>Recent Calls</h2>

                {recentCalls.length === 0 ? (
                    <p>No calls yet.</p>
                ) : (
                    recentCalls.map((call) => (
                        <div
                            key={call.callId}
                            className="history-item"
                        >
                            <strong>{call.customerName}</strong>

                            <div>{call.phoneNumber}</div>

                            <small>
                                {call.status ?? "Incoming"}
                            </small>
                        </div>
                    ))
                )}
            </div>

            {incomingCall && (
                <IncomingCallModal
                    call={incomingCall}
                    onAccept={(call) => {
                        setIncomingCall(null);
                        setActiveCall(call);
                    }}
                    onReject={() => {
                        setIncomingCall(null);
                    }}
                />
            )}

            {activeCall && (
                <ActiveCallModal
                    call={activeCall}
                    onEnd={handleCallEnded}
                />
            )}
        </div>
    );
}