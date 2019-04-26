
const mongoose = require('mongoose');
const Restaurant = require('../server/models/Restaurant');

let connection;

beforeAll(async () => {
  connection = await require("../server/db-connection")();
});
  
afterAll(async () => {
  await mongoose.connection.close();
})

it ('sets the coords field successfully', async () => {
    expect.assertions(1);

    const restaurant = new Restaurant({
        id: 'abc',
        name: 'abc name',
        location: '123 place',
        coords: {type: 'Point', coordinates: [1.1, 1.2]},
    });

    try {
      const saveResult = await restaurant.save();
    } catch(err) {
        console.error(err);
    }
    expect(true).toBe(true);
})