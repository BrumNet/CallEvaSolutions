import axios, * as others from 'axios';

export async function getProfileDetails(email, privilege){
    const base = process.env.REACT_APP_BACKEND_URL;
    //console.log(base)
    try {
        const response = await axios.get( base  + privilege + email);
        //console.log(response?.data);
        return response.data?.data;
      } catch (error) {
        console.error(error);
      }
}