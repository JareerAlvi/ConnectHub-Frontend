import axios from "axios";

const API = "https://localhost:7260/api/call";

export const simulateIncomingCall = async (phoneNumber) => {
    const response = await axios.post(`${API}/simulate`, {
        phoneNumber,
    });

    return response.data;
};

export const acceptCall = async (callId) => {
    const response = await axios.put(`${API}/${callId}/accept`);

    return response.data;
};

export const rejectCall = async (callId) => {
    const response = await axios.put(`${API}/${callId}/reject`);

    return response.data;
};

export const endCall = async (callId) => {
    const response = await axios.put(`${API}/${callId}/end`);

    return response.data;
};