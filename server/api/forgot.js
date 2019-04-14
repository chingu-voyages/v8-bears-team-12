const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const {MAILGUN_APIKEY, MAILGUN_DOMAIN} = process.env;

module.exports = app => {
  if(!(MAILGUN_APIKEY && MAILGUN_DOMAIN)) {
    console.warn('MAILGUN not setup');
    return;
  }

  app.post('/api/forgot', async (req, res) => {
    const {email} = req.body;
    try {
        const buf = await crypto.randomBytes(20);
        const token = buf.toString();
        let user = await User.findOne({email});
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() +  3600000;
        await user.save();
        const auth = {
          api_key: MAILGUN_APIKEY,
          domain: MAILGUN_DOMAIN
        };
        let smtpTransport = nodemailer.createTransport(mg(auth));
        
        const mailOptions = {
          to: email,
          from: 'no-reply@demo.com',
          subject: 'Meet and Eat password reset',
          text: `Click here to reset your password: ${req.protocol}://${req.headers.host}/api/reset/${user._id.toString()}/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged`
        }
        await smtpTransport.sendMail(mailOptions);
    } catch(err) {
        console.error(err);
        res.status(500).send(err.message);
    }
  })
};