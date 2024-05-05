import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { CLIENT_ID, CLIENT_SECRET } from './config';
import { User } from '../../types';

const setUpAuth = () => {
  passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  (_accessToken, _refreshToken, profile, done) => done(null, profile)));

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user: User, done) => done(null, user));
};

export default setUpAuth;
