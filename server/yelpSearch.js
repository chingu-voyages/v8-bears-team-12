const axios = require('axios');

const { YELP_APIKEY } = process.env;
const YELP = 'https://api.yelp.com/v3/businesses/search';

async function yelpSearch(term, location) {
  try {
    const response = await axios.get(YELP, {
      params: {
        term,
        location,
      },
      headers: {
        authorization: `Bearer ${YELP_APIKEY}`,   
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = yelpSearch;
