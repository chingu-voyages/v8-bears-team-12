const express = require('express');
const adminRouter = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const User = require('../models/User');

module.exports = app => {
    const usersRouter = express.Router();
    usersRouter.get('', async (req, res) => {
        const users = await User.find({}, { _id: 1, email: 1, name: 1, firstName: 1, lastName: 1 }).lean();
        users.forEach(u => { u.id = u._id; delete u._id; });

        res.header('X-Total-Count', users.length);
        res.json(users);
    })

    usersRouter.get('/:id', async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(ObjectId(id), { password: 0 }).lean();
        user.id = user._id;
        delete user._id;

        res.json(user);
    })

    usersRouter.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { name, firstName, lastName, email, dietRestrictions, interests, active, searchCity, password } = req.body;

        const user = await User.findById(ObjectId(id));
        user.name = name;
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        user.dietRestrictions = dietRestrictions;
        user.interests = interests;
        user.active = active;
        user.searchCity = searchCity;
        await user.save();

        const json = user.toObject();
        delete json.password;
        json.id = json._id;
        delete json._id;

        res.json(json);
    })
    adminRouter.use('/users', usersRouter);
    app.use('/api/admin', adminRouter);
}