const { getClosestCity } = require('../server/utils.js');

it('picks the closest city', () => {
  const home = {lon: -119.0005728, lat: 34.2221763};
  const closest = getClosestCity(home);

  expect(closest.name).toBe('Camarillo');
});
