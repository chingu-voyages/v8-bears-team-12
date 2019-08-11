const express = require('express');
const adminRouter = express.Router();
const User = require('../models/User');

module.exports = app => {
    const usersRouter = express.Router();
    usersRouter.get('', async (req, res) => {
        const users = await User.find({}, {_id: 1, email: 1, name: 1, firstName: 1, lastName: 1}).lean();
        users.forEach(u => {u.id = u._id; delete u._id; });

        res.header('X-Total-Count', users.length);
        res.json(users);
    })
    adminRouter.use('/users', usersRouter);
    app.use('/api/admin', adminRouter);
}