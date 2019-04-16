const passport = require('passport');
const multer = require('multer');

const upload = multer();

module.exports = app => {
  app.post(
    '/api/profile-photo-upload',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    async (req, res) => {
      console.log('got here');
      console.log({file: req.file});
      req.user.image = req.file.buffer;
      req.user.imageType = req.file.mimetype;
      await req.user.save();        
    }
  )
}