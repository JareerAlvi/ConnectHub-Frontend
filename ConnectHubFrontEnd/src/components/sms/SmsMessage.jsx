import "./SmsMessage.css";

export default function SmsMessage({ message }) {

    console.log(message);

    const outgoing =
        message.direction === "Outgoing";

    return (

        <div
            className={`message ${outgoing ? "outgoing" : "incoming"}`}
        >

            <div className="message-body">

                {message.messageBody}

            </div>

            <div className="message-time">

                {new Date(message.sentAt).toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit"

                })}

            </div>

        </div>

    );

}