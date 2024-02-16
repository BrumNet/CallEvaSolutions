// eslint-disable-next-line no-unused-vars
import axios, * as others from "axios";

export async function getProfileDetails(email, privilege) {
  
  // eslint-disable-next-line no-undef
  const base = process.env.REACT_APP_BACKEND_URL;
  //console.log(base)
  try {
    const response = await axios.get(base + privilege + email);
    //console.log(response?.data);
    return response.data?.data;
  } catch (error) {
    console.error(error);
  }
}
