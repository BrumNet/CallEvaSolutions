import axios, * as others from 'axios';

const momoHost = 'sandbox.momodeveloper.mtn.com';
const momoTokenUrl = `https://${momoHost}/collection/token/`;
const momoRequestToPayUrl = `https://${momoHost}/collection/v1_0/requesttopay`;

export async function makePayment(body){
    
var apiKey = process.env.REACT_APP_MOMO_APIKEY;
var subscriptionKey = process.env.REACT_APP_MOMO_SUBKEY;
    
    

//const {  } = req.body; //TODO: Get apikey + Subscription key
				///console.log(apiKey, subscriptionKey);

				const momoTokenResponse = await axios.post(
						momoTokenUrl,
						{},
						{
								headers: {
										'Content-Type': 'application/json',
										'Ocp-Apim-Subscription-Key': subscriptionKey,
										Authorization: `Basic ${apiKey}`,
								},
						}
				).then(async (response) => {
                    
				    const momoToken = response.data.access_token;
                    const momoResponse = await axios.post(
                        momoRequestToPayUrl,
                        body,
                        {
                          headers: {
                                                          'X-Reference-Id': 'c8f060db-5126-47a7-a67b-2fee08c0f30c',
                                                          'X-Target-Environment': 'sandbox',
                                                          'Ocp-Apim-Subscription-Key':'5b158c87ce9b495fb64dcac1852d745b',
                                                          Authorization: `Bearer ${momoToken}`,
                                                          'Content-Type': 'application/json',
                          },
                        }
                      );
                      console.log(momoResponse)
                  return momoResponse;

                });
			console.log(momoTokenResponse.data);
}