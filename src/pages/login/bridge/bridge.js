import axios, * as others from 'axios';

export async function login(data){
  
    const base = process.env.REACT_APP_BACKEND_URL;

    return await axios.post(base  + "/login", data, 
    {
    headers: { 
      //'Authorization': "Bearer "+ bearer_token,
      'Content-Type': 'application/json',
    }
  }
  ).then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function signUp(data, pwd, privilege){

  console.log(data) 

  const base = process.env.REACT_APP_BACKEND_URL;
  const url = privilege==="Customer"?"/customerprofile":"/serviceprofile"

  return await axios.post(base  + url +"?password="+pwd, data, 
  {
  headers: { 
    //'Authorization': "Bearer "+ bearer_token,
    'Content-Type': 'application/json',
  }
}
).then(function (response) {
  //console.log(response);
  return response.data
})
.catch(function (error) {
  console.log(error);
});
}