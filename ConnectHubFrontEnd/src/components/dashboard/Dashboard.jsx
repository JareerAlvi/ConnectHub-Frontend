import { useState,useEffect } from "react";
import { simulateIncomingCall } from "../../services/callService";
import IncomingCallModal from "../calls/IncomingCallModal";
import ActiveCallModal from "../calls/ActiveCallModal";
import "./Dashboard.css";
import CustomerList from "../customers/CustomerList";
import OutgoingCallModal from "../calls/OutgoingCallModal";
import { getCustomers } from "../../services/customerService";

import { startOutgoingCall } from "../../services/callService";
import SmsModal from "../sms/SmsModal";
import { autoReplies } from "../../data/chatReplies";
import {
    getConversation,
    sendSms,
    simulateIncomingSms
} from "../../services/smsService";
export default function Dashboard() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const [incomingCall, setIncomingCall] = useState(null);

    const [activeCall, setActiveCall] = useState(null);

    const [recentCalls, setRecentCalls] = useState([]);
const [customers, setCustomers] = useState([]);
const [outgoingCall, setOutgoingCall] = useState(null);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [replyIndex, setReplyIndex] = useState(0);

const [customerTyping, setCustomerTyping] = useState(false);
const [messages, setMessages] = useState([]);
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
useEffect(() => {

    loadCustomers();

}, []);

const loadCustomers = async () => {

    try{

        const data = await getCustomers();

        setCustomers(data);

    }

    catch(err){

        console.error(err);

    }

};
const handleOutgoingCall = async (customer) => {

    try{

        const call = await startOutgoingCall(customer.customerId);

        setOutgoingCall(call);

        setRecentCalls(prev => [call,...prev]);

    }

    catch(err){

        console.error(err);

        alert("Unable to start call.");

    }

};
const handleOpenChat = async (customer) => {

    setSelectedCustomer(customer);

    try {

        const conversation =
            await getConversation(customer.customerId);

        setMessages(conversation);

    }

    catch (err) {

        console.error(err);

    }

};
const handleSendSms = async (text) => {

    if (!selectedCustomer) return;

    try {

        const sms = await sendSms(

            selectedCustomer.customerId,

            text

        );

        setMessages(prev => [...prev, sms]);

        if (replyIndex >= autoReplies.length)
            return;

        setCustomerTyping(true);

        setTimeout(async () => {

            try {

                const reply = await simulateIncomingSms(

                    selectedCustomer.customerId,

                    autoReplies[replyIndex]

                );

                setMessages(prev => [

                    ...prev,

                    reply

                ]);

                setReplyIndex(prev => prev + 1);

            }

            finally {

                setCustomerTyping(false);

            }

        }, 2000);

    }

    catch (err) {

        console.error(err);

    }

};
const handleIncomingSms = async (text) => {

    if (!selectedCustomer) return;

    try {

        const sms =
            await simulateIncomingSms(
                selectedCustomer.customerId,
                text
            );

        setMessages(prev => [...prev, sms]);

    }

    catch (err) {

        console.error(err);

    }

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
            
<CustomerList
    customers={customers}
    onCall={handleOutgoingCall}
    onChat={handleOpenChat}
/>
{
    selectedCustomer && (

       <SmsModal

    customer={selectedCustomer}

    messages={messages}

    onSend={handleSendSms}

    customerTyping={customerTyping}

    onClose={() => {

        setSelectedCustomer(null);

        setMessages([]);

        setReplyIndex(0);

    }}

/>

    )

}
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
            {
    outgoingCall && (

        <OutgoingCallModal

            call={outgoingCall}

            onConnected={(call) => {

                setOutgoingCall(null);

                setActiveCall(call);

            }}

            onCancel={() => {

                setOutgoingCall(null);

            }}

        />

    )
}
        </div>
    );
}