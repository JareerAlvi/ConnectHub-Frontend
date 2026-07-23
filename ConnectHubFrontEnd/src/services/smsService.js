import axios from "axios";

const API = "https://localhost:7260/api/sms";

export const getConversation = async (customerId) => {

    const response = await axios.get(
        `${API}/conversation/${customerId}`
    );

    return response.data;

};

export const sendSms = async (
    customerId,
    messageBody
) => {

    const response = await axios.post(
        `${API}/send`,
        {
            customerId,
            messageBody
        }
    );

    return response.data;

};

export const simulateIncomingSms = async (
    customerId,
    messageBody
) => {

    const response = await axios.post(
        `${API}/simulate`,
        {
            customerId,
            messageBody
        }
    );

    return response.data;

};