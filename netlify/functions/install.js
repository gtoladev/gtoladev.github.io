import jwt from 'atlassian-jwt';
import moment from 'moment';
import fetch from 'node-fetch';



exports.handler = async function (event, context) {
  console.log({event}, {context});
  console.log('GT event:'+event.body);


 
  
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Installed" }),
  };
}