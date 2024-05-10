import passport from 'passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import crypto from 'crypto';
import { CLIENT_ID, CLIENT_SECRET } from './config';
import { User as UserType, UserInfo } from '../types';
import { User } from '../db/models';

type Done = (
  error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  user: Express.User | false,
) => void;

const handleAuthCallback = async (_accessToken: string, _refreshToken: string, profile: Profile, done: Done) => {
  try {
    const { id = '', username = crypto.randomBytes(8).toString("hex"), displayName: name = '', emails } = profile as UserInfo;
    const email = (emails && emails[0]?.value) || '';
    const createdAt = new Date();
    const updatedAt = new Date();

    await User.upsert({ id, username, email, name, createdAt, updatedAt });
    done(null, profile);
  } catch (err) {
    if (err instanceof Error) {
      done(err, false);
    }
  }
};

const setUpAuth = () => {
  passport.use(new Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    handleAuthCallback)); // eslint-disable-line @typescript-eslint/no-misused-promises

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user: UserType, done) => done(null, user));
};

export default setUpAuth;
