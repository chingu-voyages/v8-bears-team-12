const cities = require('all-the-cities');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { ObjectId } = require('mongodb');

const User = require('./models/User');

const bigCities = cities
  .filter(e => e.country == 'US' && e.population > 4000)
  .map(e => {
    e.state = e.adminCode;
    (e.city = e.name), delete e.adminCode;
    delete e.name;
    delete e.featureCode;
    return e;
  });

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getClosestCity({ lat, lon }) {
  const bigCitiesPlus = bigCities.map(e => ({
    ...e,
    dist: getDistanceFromLatLonInKm(lat, lon, e.lat, e.lon),
  }));
  return bigCitiesPlus.reduce(
    (acc, curr) => (curr.dist < acc.dist ? curr : acc),
    bigCitiesPlus[0],
  );
}

function getCityChoices(searchTerm) {
  const term = searchTerm.replace(',', ' ').replace(/\s+/, ' ');
  const regex = new RegExp(term, 'i');
  return bigCities
    .filter(e => (e.city + ' ' + e.state).match(regex))
    .slice(0, 16);
}

function addJwtCookie(res, objId) {
  const maxAge = 86400000;
  const expiresIn = '1d';
  const token = jwt.sign({ sub: objId.toString() }, SECRET, { expiresIn });
  res.cookie('jwt', token, { maxAge, httpOnly: true });
  res.cookie('has_jwt', 'yes', { maxAge });
}

async function getUserById(id) {
  return User.findOne({ _id: ObjectId(id) }, { password: false, image: false })
    .populate({ path: 'restaurantsList', select: '-users' })
    .populate({
      path: 'pals',
      select: 'interests restaurantsList name dietRestrictions ',
      populate: {
        path: 'restaurantsList',
        select: 'name',
      },
    });
}

module.exports = { getClosestCity, getCityChoices, addJwtCookie, getUserById };
