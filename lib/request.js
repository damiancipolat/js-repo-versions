const fetch = require('node-fetch');

//Gitlab - GET request.
const GET = async (url,token) =>{

  const headers = {
    'Content-Type'  : 'application/json',
    'PRIVATE-TOKEN' : token
  };

  const result = await fetch(url,{
	 	method: 'GET',
    headers
  });

  return await result.json();

};

module.exports = {
  GET
};