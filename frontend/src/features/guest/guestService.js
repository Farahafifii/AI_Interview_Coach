import axios from "axios";

const API_URL = "/";

// Adding an admin
const sendAnswerToGPT = async () => {
  const response = await axios.get(API_URL + "chat");
  return response.data;
};

const guestService = {
  sendAnswerToGPT
};

export default guestService;
