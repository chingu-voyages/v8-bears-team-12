require('dotenv').config();
const axios = require('axios');
let yelpSearch = require('../server/api/yelpSearch');

import { exportAllDeclaration } from '@babel/types';
const {YELP_APIKEY} = process.env;
const YELP = 'https://api.yelp.com/v3/businesses/search';

it('yelp responds with something', async() => {
    let response = await yelpSearch();
    expect(response.status).toBe(200);
})