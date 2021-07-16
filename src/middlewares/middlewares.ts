import passport from 'passport';

export const passportAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({
        err: info,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).send({
          err: 'Could not log in user',
        });
      }
      res.status(200).send({
        status: 'Login successful!',
      });
    });
  })(req, res, next);
};

export const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};
