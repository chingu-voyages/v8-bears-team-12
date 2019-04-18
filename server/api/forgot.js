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

  app.post('/api/forgot', async (req, res) => {
    const { email } = req.body;
    try {
      const buf = await crypto.randomBytes(20);
      const token = buf.toString('hex');
      let user = await User.findOne({ email });
      if (!user)
        return res.json({ error: true, message: 'no such email' });

      const now = new Date();
      if (user.resetPasswordToken && now < user.resetPasswordExpires ) {
        return res.json({ error: true, message: 'an unexpired password reset exists. check your email.'});
      }

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 7200000;
      await user.save();
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
        subject: 'Meet and Eat password reset',
        text: `Click here to reset your password: ${req.protocol}://${
          req.headers.host
        }/api/reset/${user._id.toString()}/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged`,
      };
      await smtpTransport.sendMail(mailOptions);
      res.json({error: false, message: 'password reset email sent'});
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
};
