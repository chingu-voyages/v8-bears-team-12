const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const crypto = require('crypto');
const User = require('../models/User');

const { MAILGUN_APIKEY, MAILGUN_DOMAIN } = process.env;

module.exports = (app) => {
  if (!(MAILGUN_APIKEY && MAILGUN_DOMAIN)) {
    console.warn('MAILGUN not setup');
    return;
  }

  app.post('/api/register', async (req, res) => {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      interests,
      dietRestrictions,
    } = req.body.user;

    try {
      const buf = await crypto.randomBytes(20);
      const token = buf.toString('hex');
      const now = new Date();
      let found = false;

      await User.findOne({ email }).then((user) => {
        if (user) {
          found = true;
          return res.json({ error: { message: 'Email already exists' } });
        }
      });

      let user = new User({
        name,
        firstName,
        lastName,
        email,
        password,
        interests,
        dietRestrictions,
      });
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 7200000;

      const auth = {
        auth: {
          api_key: MAILGUN_APIKEY,
          domain: MAILGUN_DOMAIN,
        },
      };

      let smtpTransport = nodemailer.createTransport(mg(auth));

      const mailOptions = {
        to: email,
        from: 'no-reply@demo.com',
        subject: 'Meet and Eat email verification',
        text: `Click here to verify your email: ${req.protocol}://${
          req.headers.host
        }/api/reset/${user._id.toString()}/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged`,
      };
      !found && (await smtpTransport.sendMail(mailOptions));
      !found &&
        (await user.save().then((user) =>
          res.json({
            user,
            error: { message: 'Please check your email for verification link' },
          }),
        ));
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
};
