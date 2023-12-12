import axios, * as others from 'axios';

export async function getResults(category, subcategory){
  const base = process.env.REACT_APP_BACKEND_URL;
  try {
      const response = await axios.get( base  + '/services/category/'+ category);
      //console.log(response?.data);
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
}