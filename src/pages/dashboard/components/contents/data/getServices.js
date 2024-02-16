// eslint-disable-next-line no-unused-vars
import axios, * as others from "axios";
  // eslint-disable-next-line no-undef
const base = process.env.REACT_APP_BACKEND_URL;

export async function getServices(email) {
  try {
    const response = await axios.get(base + "/services/" + email);
    return response.data?.data;
  } catch (error) {
    console.error(error);
  }
}
