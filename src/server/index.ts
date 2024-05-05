import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { SECRET } from './util/config';
import router from './routes';
import setUpAuth from './util/oidc';
import { User } from '../types';

const app = express();

app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', (req, res, next) => router(req, res, next));
app.use('/api', (_, res) => res.sendStatus(404));

/* eslint-disable */
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google'), (_, res) => {
  res.redirect('/');
});
/* eslint-disable */

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${(req.user as User).displayName}`);
  } else {
    res.redirect('/auth/google');
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  setUpAuth();
  console.log(`Server running on port ${PORT}`);
});
