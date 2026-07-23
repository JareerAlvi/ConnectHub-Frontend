import { useEffect } from "react";
import { connectOutgoingCall } from "../../services/callService";
import "./OutgoingCallModal.css";

export default function OutgoingCallModal({
    call,
    onConnected,
    onCancel
}) {

    useEffect(() => {

        const timer = setTimeout(async () => {

            try {

                const activeCall =
                    await connectOutgoingCall(call.callId);

                onConnected(activeCall);

            } catch (err) {

                console.error(err);

            }

        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    return (

        <div className="outgoing-overlay">

            <div className="outgoing-modal">

                <h2>📞 Calling...</h2>

                <h3>{call.customerName}</h3>

                <p>{call.companyName}</p>

                <p>{call.phoneNumber}</p>

                <div className="ringing">

                    Ringing...

                </div>

                <button
                    onClick={onCancel}
                    className="cancel-btn"
                >
                    Cancel
                </button>

            </div>

        </div>

    );

}