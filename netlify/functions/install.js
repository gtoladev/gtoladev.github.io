exports.handler = async function (event, context) {
  console.log({event}, {context});
  //const eventBody = JSON.parse(event.body)
  console.log(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Installed" }),
  };
}