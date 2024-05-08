import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { SECRET, PORT } from './util/config';
import router from './routes';
import setUpAuth from './util/oidc';
import { connectToDataBase } from './db/connection';
import logger from './util/logger';

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

app.listen(PORT, async () => {
  await connectToDataBase();
  await setUpAuth();
  logger.info(`Server running on port ${PORT}`);
});
