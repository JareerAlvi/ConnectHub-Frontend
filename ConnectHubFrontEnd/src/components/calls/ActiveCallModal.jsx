import { useEffect, useState } from "react";
import { endCall } from "../../services/callService";
import "./ActiveCallModal.css";

export default function ActiveCallModal({
    call,
    onEnd
}) {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setSeconds(prev => prev + 1);

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    const formatTime = () => {

        const mins = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    };

    const handleEndCall = async () => {

        try {

            const response = await endCall(call.callId);

            onEnd(response);

        }
        catch (error) {

            console.error(error);

            alert("Unable to end call.");

        }

    };

    return (

        <div className="active-overlay">

            <div className="active-modal">

                <h2>📞 Active Call</h2>

                <h3>{call.customerName}</h3>

                <p>{call.companyName}</p>

                <p>{call.phoneNumber}</p>

                <div className="call-timer">

                    {formatTime()}

                </div>

                <button
                    className="end-call-btn"
                    onClick={handleEndCall}
                >
                    End Call
                </button>

            </div>

        </div>

    );

}