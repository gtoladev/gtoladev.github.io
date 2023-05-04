import * as jwt from 'atlassian-jwt';
import moment from 'moment';
import fetch from 'node-fetch';



exports.handler = async function (event, context) {
  console.log({event}, {context});
  console.log('GT event:'+event.body);
  const bodyJSON = JSON.parse(event.body)

  const now = moment().utc();
  const req2 = jwt.fromMethodAndUrl('GET', '/rest/atlassian-connect/1/app/module/dynamic');
  //console.log(req2);
  //const req2 = "GET&/rest/atlassian-connect/1/app/module/dynamic&";
  const tokenData = {
      "iss": bodyJSON.key, //bodyJSON.clientKey,
      "iat": now.unix(),                    // The time the token is generated
      "exp": now.add(3, 'minutes').unix(),  // Token expiry time (recommend 3 minutes after issuing)
      "qsh": jwt.createQueryStringHash(req2) // [Query String Hash](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt/#a-name-qsh-a-creating-a-query-string-hash)
  };

  const token = jwt.encodeSymmetric(tokenData, bodyJSON.sharedSecret);
  console.log('GT token:'+token);

  fetch(bodyJSON.baseUrl+'/rest/atlassian-connect/1/app/module/dynamic', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'JWT '+token
    }
  })
  .then(response => {
    console.log('GT Response:'+ response.status +' '+response.statusText);
  })
  .then(text => console.log('GT success: '+text))
  .catch(err => console.log('GT err: '+err));

 
  
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Installed" }),
  };
}