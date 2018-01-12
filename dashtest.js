var dash_button = require('node-dash-button');
var dash = dash_button("fc:65:de:9a:a4:b7", null, 1000);
let huejay = require('huejay');

let client = new huejay.Client({
  host:     '192.168.1.150',
  username: 'gnY5VDZltxnccwx4jv9AiK3v1DDsAXrJgQwKHrvG'
});

let user = new client.users.User;

function createHueClient(){
  client.users.create(user)
    .then(user => {
      console.log(`New user created - Username: ${user.username}`);
    })
    .catch(error => {
      if (error instanceof huejay.Error && error.type === 101) {
        return console.log(`Link button not pressed. Try again...`);
      }
      console.log(error.stack);
    });
}

function flipLights(){
  client.lights.getById(3)
  .then(light => {
    if (!light.on)
      light.on = true
    else
      light.on = false
    return client.lights.save(light);
  })
  .then(light => {
    console.log(`Updated light [${light.id}]`);
  })
  .catch(error => {
    console.log('Something went wrong');
    console.log(error.stack);
  });
}

client.bridge.ping()
  .then(() => {
    console.log('Successful connection');
  })
  .catch(error => {
    console.log('Could not connect');
  });

client.bridge.isAuthenticated()
  .then(() => {
    console.log('Successful authentication');
  })
  .catch(error => {
    console.log('Could not authenticate');
  });

createHueClient();

dash.on("detected", function (){
  var d = new Date()
  console.log("pushed at: ",d.toTimeString());
  flipLights();
});




// function runDiscover() {
//   huejay.discover()
//     .then(bridges => {
//       for (let bridge of bridges) {
//         console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
//       }
//     })
//     .catch(error => {
//       console.log(`An error occurred: ${error.message}`);
//     });
// }
