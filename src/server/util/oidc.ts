import passport from 'passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { CLIENT_ID, CLIENT_SECRET } from './config';
import { User as UserType } from '../types';
import { User } from '../db/models';

const setUpAuth = async () => {
  passport.use(new Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  }, async (_accessToken, _refreshToken, profile: Profile, done) => {

    const id = profile.id || '';
    const username = profile.username || '';
    const email = (profile.emails && profile.emails[0]?.value) || '';
    const name = profile.displayName || '';
    const createdAt = new Date;
    const updatedAt = new Date;

    await User.upsert({ id, username, email, name, createdAt, updatedAt });
    done(null, profile);
  }));

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user: UserType, done) => done(null, user));
};

export default setUpAuth;
