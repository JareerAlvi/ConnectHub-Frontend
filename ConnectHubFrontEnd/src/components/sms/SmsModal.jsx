import SmsMessage from "./SmsMessage";
import SmsInput from "./SmsInput";
import "./SmsModal.css";
import { useRef, useEffect } from "react";


export default function SmsModal({

    customer,
    messages,
    onSend,
    customerTyping,
    onClose

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages, customerTyping]);

    if (!customer) return null;

    return (

        <div className="sms-overlay">

            <div className="sms-modal">

     <div className="sms-header">

    <div className="header-left">

        <div className="avatar">

            {customer.fullName.charAt(0)}

        </div>

        <div className="user-info">

            <h2>{customer.fullName}</h2>

            <small>
                Online • {customer.phoneNumber}
            </small>

        </div>

    </div>

    <button
        className="close-btn"
        onClick={onClose}
    >
        ✕
    </button>

</div>
                <div className="sms-body">

                    {

                        messages.length === 0 ?

                            <p>No messages yet.</p>

                            :

                            messages.map(message => (

                                <SmsMessage

                                    key={message.messageId}

                                    message={message}

                                />

                            ))

                    }
{

    customerTyping && (

        <div className="message incoming">

            <div className="message-body">

              <div className="typing">

    <span></span>
    <span></span>
    <span></span>

</div>

            </div>

        </div>

    )

}
                </div>
<div ref={bottomRef}></div>
                <SmsInput

                    onSend={onSend}

                />

            </div>

        </div>

    );

}