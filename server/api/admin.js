const express = require('express');
const adminRouter = express.Router();
const User = require('../models/User');

module.exports = app => {
    const usersRouter = express.Router();
    usersRouter.get('', async (req, res) => {
        const users = await User.find({});
        const data = users.map(u => { return Object.assign({}, u._doc, {id: u._id})})
        console.log({data});
        res.header('X-Total-Count', data.length);
        res.json(data);
    })
    adminRouter.use('/users', usersRouter);
    app.use('/api/admin', adminRouter);
}