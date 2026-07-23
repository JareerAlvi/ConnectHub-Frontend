import axios from "axios";

const API = "https://localhost:7260/api/customer";

export const getCustomers = async () => {

    const response = await axios.get(API);

    return response.data;

};