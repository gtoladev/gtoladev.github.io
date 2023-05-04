import * as jwt from 'atlassian-jwt';
import moment from 'moment';
import fetch from 'node-fetch';

var bodyData = `{
  "jiraEntityProperties": [
    {
      "keyConfigurations": [
        {
          "extractions": [
            {
              "objectName": "extension",
              "type": "text",
              "alias": "attachmentExtension"
            }
          ],
          "propertyKey": "attachment"
        }
      ],
      "entityType": "issue",
      "name": {
        "value": "Attachment Index Document"
      },
      "key": "dynamic-attachment-entity-property"
    }
  ],
  "jiraIssueFields": [
    {
      "description": {
        "value": "A dynamically added single-select field"
      },
      "type": "single_select",
      "extractions": [
        {
          "path": "category",
          "type": "text",
          "name": "categoryName"
        }
      ],
      "name": {
        "value": "Dynamic single select"
      },
      "key": "dynamic-select-field"
    }
  ]
}`;

exports.handler = async function (event, context) {
  console.log({event}, {context});
  console.log('GT event:'+event.body);
  const bodyJSON = JSON.parse(event.body)

  const now = moment().utc();
  //GTODO
  //const req2 = jwt.fromMethodAndUrl('GET', '/rest/atlassian-connect/1/app/module/dynamic');
  const req2 = jwt.fromMethodAndUrl('POST', '/rest/atlassian-connect/1/app/module/dynamic');
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

  await fetch(bodyJSON.baseUrl+'/rest/atlassian-connect/1/app/module/dynamic', {
    method: 'POST',
    body: bodyData
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'JWT '+token
    }
  })
  .then(res => res.json())
  .then(json => console.log(json));

  //await fetch(bodyJSON.baseUrl+'/rest/atlassian-connect/1/app/module/dynamic', {
  //  method: 'GET',
  //  headers: {
  //    'Accept': 'application/json',
   //   'Authorization': 'JWT '+token
  //  }
  //})
  //.then(res => res.json())
  //.then(json => console.log(json));
  
  

 
  
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Installed" }),
  };
}