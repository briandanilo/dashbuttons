let huejay = require('huejay');

let client = new huejay.Client({
  host:     '192.168.1.150',
  username: 'gnY5VDZltxnccwx4jv9AiK3v1DDsAXrJgQwKHrvG'
});

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

  // client.lights.getAll()
  //   .then((lights) => {
  //     for (let light of lights){
  //       console.log(light.name)
  //       console.log(light.on)
  //       console.log(light.id)
  //     }
  //   })

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

  // client.lights.getAll()
  //   .then(lights => {
  //     for (let light of lights) {
  //       console.log(`Light [${light.id}]: ${light.name}`);
  //       console.log(`  Type:             ${light.type}`);
  //       console.log(`  Unique ID:        ${light.uniqueId}`);
  //       console.log(`  Manufacturer:     ${light.manufacturer}`);
  //       console.log(`  Model Id:         ${light.modelId}`);
  //       console.log('  Model:');
  //       console.log(`    Id:             ${light.model.id}`);
  //       console.log(`    Manufacturer:   ${light.model.manufacturer}`);
  //       console.log(`    Name:           ${light.model.name}`);
  //       console.log(`    Type:           ${light.model.type}`);
  //       console.log(`    Color Gamut:    ${light.model.colorGamut}`);
  //       console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
  //       console.log(`  Software Version: ${light.softwareVersion}`);
  //       console.log('  State:');
  //       console.log(`    On:         ${light.on}`);
  //       console.log(`    Reachable:  ${light.reachable}`);
  //       console.log(`    Brightness: ${light.brightness}`);
  //       console.log(`    Color mode: ${light.colorMode}`);
  //       console.log(`    Hue:        ${light.hue}`);
  //       console.log(`    Saturation: ${light.saturation}`);
  //       console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
  //       console.log(`    Color Temp: ${light.colorTemp}`);
  //       console.log(`    Alert:      ${light.alert}`);
  //       console.log(`    Effect:     ${light.effect}`);
  //       console.log();
  //     }
  //   });
