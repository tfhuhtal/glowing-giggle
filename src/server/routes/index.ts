import express from 'express';
import passport from 'passport';
import { User } from '../../types';

const router = express();

router.get('/ping', (_, res) => res.send('pong'));

/* eslint-disable */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google'), (_, res) => {
  res.redirect('/api/');
});
/* eslint-disable */

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${(req.user as User).displayName}`);
  } else {
    res.redirect('/api/auth/google');
  }
});

export default router;
