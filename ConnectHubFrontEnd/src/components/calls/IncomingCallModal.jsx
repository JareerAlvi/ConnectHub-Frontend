import "./IncomingCallModal.css";
import { acceptCall, rejectCall } from "../../services/callService";

export default function IncomingCallModal({
    call,
    onAccept,
    onReject
}) {

    const handleAccept = async () => {

        try {

           const response = await acceptCall(call.callId);

onAccept({
    ...call,
    status: response.status
});
        }
        catch (error) {

            console.error(error);

            alert("Unable to accept call.");

        }

    };

    const handleReject = async () => {

        try {

            await rejectCall(call.callId);

            onReject();

        }
        catch (error) {

            console.error(error);

            alert("Unable to reject call.");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="incoming-modal">

                <h2>📞 Incoming Call</h2>

                <h3>{call.customerName}</h3>

                <p>{call.companyName}</p>

                <p>{call.phoneNumber}</p>

                <div className="button-group">

                    <button
                        className="reject-btn"
                        onClick={handleReject}
                    >
                        Reject
                    </button>

                    <button
                        className="accept-btn"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>

                </div>

            </div>

        </div>

    );

}