module.exports = app => {
  app.get('/api/logout', (req, res) => {
    res.clearCookie('jwt', { httpOnly: true });
    res.clearCookie('has_jwt', {});
    res.send('');
  });
};
