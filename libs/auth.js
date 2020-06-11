module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/user/login');
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated())
      res.redirect('/');
    else
      return next();
  }
}
