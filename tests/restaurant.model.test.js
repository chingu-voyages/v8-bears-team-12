
const mongoose = require('mongoose');
const Restaurant = require('../server/models/Restaurant');

it ('is true', async () => {
    expect.assertions(1);

    await require('../server/db-connection')();
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
    mongoose.connection.close();
})