import axios, * as others from 'axios';
import { previousResults } from './previousResults';

export async function getResults(category, subcategory){
  const base = process.env.REACT_APP_BACKEND_URL;

  try {
      const response = await axios.get(base + '/services');
      return response.data?.data; 
    } 
    
  catch (error) {
      console.error(error);
      return []
    }
}