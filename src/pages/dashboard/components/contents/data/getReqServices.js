import axios, * as others from 'axios';

export async function getReqServices(email, privilege){
  const base = process.env.REACT_APP_BACKEND_URL;
  try {
      const response = await axios.get( base  + '/servicerequest/'+ privilege +"/"+ email);
      //console.log(response?.data);
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
}

