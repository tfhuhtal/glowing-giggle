import winston from 'winston';


const { combine, timestamp, printf, splat } = winston.format;

const transports = [];

transports.push(new winston.transports.File({ filename: 'debug.log' }));

const devFormat = printf(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ({ level, message, timestamp, ...rest }) =>
    `${timestamp} ${level}: ${message} ${JSON.stringify(rest)}`
);

transports.push(
  new winston.transports.Console({
    level: 'debug',
    format: combine(splat(), timestamp(), devFormat),
  })
);

const levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const prodFormat = winston.format.printf(({ level, ...rest }) =>
  JSON.stringify({
    level: levels[level],
    ...rest,
  })
);

transports.push(new winston.transports.Console({ format: prodFormat }));

const logger = winston.createLogger({ transports });

export default logger;
