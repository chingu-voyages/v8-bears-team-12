const yelpSearch = require('../yelpSearch');

module.exports = app => {
    app.get('/api/restaurant-search/:location/:term', async (req, res) => {
    const { term, location } = req.params;

    if(process.env.TESTDATA) return res.json(require('../fixtures/example-restaurants'));

    try {
        let response = await yelpSearch(term, location);
        const { businesses } = response.data;
        let restaurants = businesses.map(business => {
        const {
            id,
            name,
            image_url,
            url,
            rating,
            location,
            coordinates,
            phone,
        } = business;

        return {
            id,
            name,
            image_url,
            url,
            rating,
            location: location.display_address.join(' '),
            coords: [coordinates.longitude, coordinates.latitude],
            phone,
        };
        });
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
    });
}